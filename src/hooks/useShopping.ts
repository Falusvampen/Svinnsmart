import { ShoppingList } from "@/models/shopping";
import { ShoppingService } from "@/services/shoppingService";
import { useEffect, useState } from "react";

export const useShopping = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    let mounted = true;
    ShoppingService.fetchInitialLists().then((data) => {
      if (!mounted) return;
      setLists(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const createList = (title: string) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      title,
      items: [],
      updatedAt: Date.now(),
    };
    setLists((s) => [newList, ...s]);
  };

  const deleteList = (id: string) => {
    setLists((s) => s.filter((l) => l.id !== id));
  };

  const toggleItem = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id !== listId
          ? l
          : {
              ...l,
              items: l.items.map((it) =>
                it.id !== itemId ? it : { ...it, checked: !it.checked },
              ),
              updatedAt: Date.now(),
            },
      ),
    );
  };

  const addItemToList = (listId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLists((prev) =>
      prev.map((l) =>
        l.id !== listId
          ? l
          : {
              ...l,
              items: [{ id: Date.now().toString(), name: trimmed }, ...l.items],
              updatedAt: Date.now(),
            },
      ),
    );
  };

  return { lists, createList, deleteList, toggleItem, addItemToList, setLists };
};

export default useShopping;
