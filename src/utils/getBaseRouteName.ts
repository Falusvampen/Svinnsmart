// Hjälpfunktion för att få ut den sista delen av en route.name och prettify den
export const getBaseRouteName = (raw: string) => {
  const parts = raw.split("/");
  const last = parts[parts.length - 1] || raw;
  if (last === "index") return "Home";
  return last.charAt(0).toUpperCase() + last.slice(1);
};
