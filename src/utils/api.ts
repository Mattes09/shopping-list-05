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
    return [...shoppingLists]; // Return a copy of mock data to avoid mutations
  }
}

export async function addShoppingList(newList: any) {
  try {
    const response = await fetch(`${BASE_URL}/shoppingLists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    });
    if (!response.ok) {
      throw new Error("Failed to add shopping list.");
    }
    return response.json();
  } catch {
    console.warn("Server unavailable, adding to mock data.");
    const mockId = Math.floor(Math.random() * 1000000) + 1;
    const addedList = { ...newList, id: mockId };

    // Check for duplicates before adding
    const exists = shoppingLists.some((list) => list.id === mockId);
    if (!exists) {
      shoppingLists.push(addedList); // Add to mock data if unique
    }
    return addedList;
  }
}

export async function updateShoppingList(id: number, updatedList: any) {
  try {
    const response = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });
    if (!response.ok) {
      throw new Error("Failed to update shopping list.");
    }
    return response.json();
  } catch {
    console.warn("Server unavailable, updating mock data.");
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index > -1) {
      shoppingLists[index] = updatedList;
    }
    return updatedList;
  }
}

export async function deleteShoppingList(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete shopping list.");
    }
  } catch {
    console.warn("Server unavailable, deleting from mock data.");
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index > -1) {
      shoppingLists.splice(index, 1);
    }
  }
}
