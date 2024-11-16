import React, { useState } from "react";
import { shoppingList as mockShoppingList } from "../mockData";

// SVG for bin icon
const BinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4L4 4.059V13.5A1.5 1.5 0 0 0 5.5 15h5a1.5 1.5 0 0 0 1.5-1.5V4.059L11.882 4H4.118zM2.5 3A1.5 1.5 0 0 1 4 1.5h8A1.5 1.5 0 0 1 13.5 3h-11zM3 3v-.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5V3h-9z" />
  </svg>
);

const ShoppingListView: React.FC = () => {
  const [shoppingList, setShoppingList] = useState(mockShoppingList);
  const [showResolved, setShowResolved] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<
    "addUser" | "deleteUser" | null
  >(null);

  // Toggle visibility of resolved items
  const toggleResolvedView = () => setShowResolved(!showResolved);

  // Add a new item
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

  // Resolve an item
  const handleResolveItem = (id: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  // Delete an item
  const handleDeleteItem = (id: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== id),
    }));
  };

  // Add a user
  const handleAddUser = () => {
    if (newUserName.trim() && !shoppingList.members.includes(newUserName)) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: [...prevList.members, newUserName.trim()],
      }));
      setNewUserName("");
      setModalSection(null); // Close section after adding
    }
  };

  // Delete a user
  const handleDeleteUser = (user: string) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== user),
    }));
    setModalSection(null); // Ensure modal resets after deletion
  };

  // Delete the entire list
  const handleDeleteList = () => {
    alert("List deleted! (This is just a placeholder action.)");
  };

  // Toggle modal visibility and reset modal section
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setModalSection(null); // Reset modal section when opening modal
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
        <div className="mb-3">
          <button className="btn btn-primary" onClick={toggleResolvedView}>
            {showResolved ? "Hide Resolved Items" : "Show Resolved Items"}
          </button>
        </div>
        <ul className="list-group">
          {visibleItems.map((item) => (
            <li
              key={item.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                item.resolved ? "list-group-item-success" : ""
              }`}
            >
              <div>
                {item.name}
                {item.resolved && (
                  <span className="badge bg-success ms-2">Resolved</span>
                )}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleResolveItem(item.id)}
                >
                  {item.resolved ? "Unresolve" : "Resolve"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <BinIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Add new item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
      </div>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={toggleModal}>
          Manage
        </button>
        <button className="btn btn-warning" onClick={() => alert("Archived!")}>
          Archive
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Manage List</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                {!modalSection && (
                  <>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => setModalSection("addUser")}
                    >
                      Add User
                    </button>
                    <button
                      className="btn btn-danger mb-2"
                      onClick={() => setModalSection("deleteUser")}
                    >
                      Delete User
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={handleDeleteList}
                    >
                      Delete List
                    </button>
                  </>
                )}
                {modalSection === "addUser" && (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter user name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleAddUser}>
                      Add User
                    </button>
                  </>
                )}
                {modalSection === "deleteUser" && (
                  <>
                    <ul className="list-group">
                      {shoppingList.members.map((user) => (
                        <li
                          key={user}
                          className="list-group-item d-flex justify-content-between"
                        >
                          {user}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <BinIcon />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListView;
