import { shoppingLists } from "../mockData";

const BASE_URL = "http://localhost:3001";

export async function fetchShoppingLists() {
  try {
    const response = await fetch(`${BASE_URL}/shoppingLists`);
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch {
    console.warn("Server unavailable, falling back to mock data.");
    return shoppingLists; // Use mock data on failure
  }
}

export async function addShoppingList(newList: any) {
  const response = await fetch(`${BASE_URL}/shoppingLists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newList),
  });
  if (!response.ok) {
    throw new Error("Failed to add shopping list.");
  }
  return response.json();
}

export async function updateShoppingList(id: number, updatedList: any) {
  const response = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedList),
  });
  if (!response.ok) {
    throw new Error("Failed to update shopping list.");
  }
  return response.json();
}

export async function deleteShoppingList(id: number) {
  const response = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete shopping list.");
  }
}
