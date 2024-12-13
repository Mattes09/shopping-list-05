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

export const shoppingLists: ShoppingList[] = [
  {
    id: 1,
    name: "Sneakers",
    owner: "John Doe",
    members: ["Mates", "Mike"],
    items: [
      { id: 1, name: "New Balance", resolved: false },
      { id: 2, name: "Nike", resolved: false },
      { id: 3, name: "ASICS", resolved: true },
    ],
    archived: false,
  },
  {
    id: 2,
    name: "Groceries",
    owner: "Jane Smith",
    members: ["John", "Alex"],
    items: [
      { id: 4, name: "Milk", resolved: false },
      { id: 5, name: "Eggs", resolved: true },
    ],
    archived: false,
  },
];
