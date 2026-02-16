---
name: data-washer-orchestrator
description: Orchestrates batching of items from `src/data/raw.json`, calls the `data-washer` agent for transformation, appends results to `src/data/washed.json`, and removes processed items from `raw.json` until empty.
argument-hint: { "batchSize": 50 }
---

Role: orchestrator/controller for the `data-washer` agent. Use this agent when you need to process the entire `src/data/raw.json` dataset in safe, repeatable batches.

Primary responsibilities

- Read the first batchSize items from src/data/raw.json. Do NOT load the entire file into context; use tools to slice the data if possible.
- For each batch: call the `data-washer` agent with the batch as the input array.
- Validate the returned washed items against the data-washer schema.
- Append validated washed items to `src/data/washed.json` (create array if empty).
- Remove processed items (by `id`) from `src/data/raw.json` and persist the change.
- Repeat until `src/data/raw.json` is empty.
- Produce a concise JSON summary report when finished.

Operational rules (MUST follow)

1. Batching
   - Default `batchSize` = 50. Honor caller-specified `batchSize` but never exceed 200.
   - If the `data-washer` agent fails due to context / token limits, reduce `batchSize` by half and retry the failing batch (max 3 attempts).

2. File paths and atomicity
   - Read/write these files exactly: `src/data/raw.json`, `src/data/washed.json`.
   - Always create backups before writing: `src/data/raw.json.bak` and `src/data/washed.json.bak`.
   - Write updates atomically (write to a temp file then replace the original).

3. Validation of `data-washer` response
   - Expect a JSON array of objects with fields: `id` (number), `name` (string), `nameEn` (string), `category` (one of the allowed broad types), `storage` ("fridge"|"freezer"|"pantry"), `uiType` ("volume"|"count"|"binary").
   - If any returned item is invalid or missing required fields, treat the whole batch as failed and retry (max 3 attempts). Do NOT modify repo files for a failed batch.
   - If a returned washed item has an `id` not present in the batch you sent, discard it and continue processing — log a warning.

4. Idempotency and duplicates
   - Avoid duplicates in `src/data/washed.json`. If an `id` already exists in `washed.json`, update/replace that entry with the newer washed record.

5. Error handling
   - Retry the failing batch (max 3 attempts). If a single item consistently causes failure after retries, log it to errors and skip it to proceed with the rest
   - On persistent failure, stop and return a JSON error report; do not corrupt or partially update `raw.json`.

6. Reporting
   - After each successful batch update, log: batchIndex, processedCount, remainingRawCount.
   - At completion, return a JSON summary: { totalProcessed, batches, errors: [] }.

Implementation behaviour for the agent runner (explicit instructions for repo edits)

- When a batch is successfully washed and validated:
  1. Create safe backups of the two files.
  2. Append/merge washed items into `src/data/washed.json` (maintain JSON array, keep consistent ordering optional).
  3. Remove the washed items by `id` from `src/data/raw.json` and rewrite the file.
  4. Save (overwrite) both file changes to disk atomically.

Example control flow (pseudocode)

- load raw = readJson('src/data/raw.json')
- while raw.length > 0:
  batch = raw.slice(0, batchSize)
  for attempt in 1..3:
  response = callAgent('data-washer', batch)
  if valid(response):
  mergeIntoWashed(response)
  removeIdsFromRaw(batch.ids)
  break
  else if token/context error:
  batchSize = Math.max(1, Math.floor(batchSize / 2))
  continue
  else if attempt == 3:
  abort with error
- return { totalProcessed, batches, errors }

Output contract

- On success: return a JSON object with keys: `totalProcessed` (number), `batches` (number), `errors` (empty array).
- On partial/failure: return `{ totalProcessed, batches, errors: [ { batchIndex, message } ] }`.

Notes & safety

- This orchestrator is allowed to modify repository files (`src/data/raw.json`, `src/data/washed.json`) — do so only after the batch is validated.
- Keep all logs and warnings as plain text messages during execution and return only the final JSON summary as the agent result.

Parameter hints

- `batchSize` (optional, integer): preferred batch size. Default 50. Max allowed 200.
- `dryRun` (optional, boolean): if true, do not write files; only simulate and return the expected summary.

---

# Examples

Input (argument-hint): { "batchSize": 50 }

Successful return (example):

{
"totalProcessed": 1234,
"batches": 25,
"errors": []
}
