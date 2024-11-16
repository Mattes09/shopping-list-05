export interface ShoppingListItem {
  id: number;
  name: string;
  resolved: boolean;
}

export interface ShoppingList {
  id: number;
  name: string;
  owner: string;
  members: string[];
  items: ShoppingListItem[];
  archived: boolean;
}

export const shoppingList: ShoppingList = {
  id: 1,
  name: "Weekly Groceries",
  owner: "John Doe",
  members: ["Jane Doe", "Bob Smith"],
  items: [
    { id: 1, name: "Milk", resolved: false },
    { id: 2, name: "Bread", resolved: false },
    { id: 3, name: "Eggs", resolved: true },
  ],
  archived: false,
};
