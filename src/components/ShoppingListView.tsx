import React, { useState } from "react";
import { shoppingLists } from "../mockData";
import { ShoppingList } from "../mockData";

const mockShoppingList: ShoppingList = shoppingLists[0];

const ShoppingListView: React.FC = () => {
  const [shoppingList, setShoppingList] =
    useState<ShoppingList>(mockShoppingList);
  const [showResolved, setShowResolved] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<
    "addUser" | "deleteUser" | null
  >(null);

  const toggleResolvedView = () => setShowResolved((prev) => !prev);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      setShoppingList((prevList) => ({
        ...prevList,
        items: [
          ...prevList.items,
          { id: Date.now(), name: newItemName.trim(), resolved: false },
        ],
      }));
      setNewItemName("");
    }
  };

  const handleResolveItem = (id: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  const handleDeleteItem = (id: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== id),
    }));
  };

  const handleAddUser = () => {
    if (newUserName.trim() && !shoppingList.members.includes(newUserName)) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: [...prevList.members, newUserName.trim()],
      }));
      setNewUserName("");
      setModalSection(null);
    }
  };

  const handleDeleteUser = (user: string) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== user),
    }));
    setModalSection(null);
  };

  const handleDeleteList = () => {
    alert("List deleted! (Placeholder for delete functionality)");
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      setModalSection(null);
    }
  };

  const visibleItems = showResolved
    ? shoppingList.items
    : shoppingList.items.filter((item) => !item.resolved);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{shoppingList.name}</h1>
      <div className="mb-3">
        <strong>Owner:</strong> {shoppingList.owner}
      </div>
      <div className="mb-3">
        <strong>Users:</strong> {shoppingList.members.join(", ")}
      </div>
      <div className="mb-4">
        <h3>Items</h3>
        <button onClick={toggleResolvedView}>
          {showResolved ? "Hide Resolved Items" : "Show Resolved Items"}
        </button>
        <ul>
          {visibleItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleResolveItem(item.id)}>
                Resolve
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add a new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div>
        <button onClick={toggleModal}>Manage</button>
        <button onClick={handleDeleteList}>Delete List</button>
      </div>

      {isModalOpen && (
        <div>
          {!modalSection && (
            <>
              <button onClick={() => setModalSection("addUser")}>
                Add User
              </button>
              <button onClick={() => setModalSection("deleteUser")}>
                Delete User
              </button>
            </>
          )}
          {modalSection === "addUser" && (
            <div>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Add a new user"
              />
              <button onClick={handleAddUser}>Add</button>
            </div>
          )}
          {modalSection === "deleteUser" && (
            <ul>
              {shoppingList.members.map((user) => (
                <li key={user}>
                  {user}
                  <button onClick={() => handleDeleteUser(user)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingListView;
