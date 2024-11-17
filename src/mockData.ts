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
  name: "Sneakers",
  owner: "John Doe",
  members: ["Jane Doe", "Bob Smith"],
  items: [
    { id: 1, name: "New Balance", resolved: false },
    { id: 2, name: "Nike", resolved: false },
    { id: 3, name: "ASICS", resolved: true },
  ],
  archived: false,
};
