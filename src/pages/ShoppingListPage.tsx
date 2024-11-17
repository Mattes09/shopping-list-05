import React, { useState } from "react";
import { shoppingList as mockShoppingList } from "../mockData";
import ItemList from "../components/ItemList";
import ManageModal from "../components/ManageModal";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  AppBar,
  Toolbar,
  Divider,
} from "@mui/material";

const ShoppingListPage: React.FC = () => {
  const [shoppingList, setShoppingList] = useState(mockShoppingList);
  const [currentUser, setCurrentUser] = useState("John Doe");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(shoppingList.name);
  const [showResolved, setShowResolved] = useState(false);
  const handleAddUser = (name: string) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: [...prevList.members, name],
    }));
  };

  const handleDeleteUser = (name: string) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== name),
    }));
  };

  const handleDeleteList = () => {
    alert("List deleted! (Placeholder action)");
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

  const toggleEditName = () => {
    if (isEditingName && editedName.trim()) {
      setShoppingList((prevList) => ({
        ...prevList,
        name: editedName.trim(),
      }));
    }
    setIsEditingName((prev) => !prev);
  };

  const leaveShoppingList = () => {
    if (currentUser !== shoppingList.owner) {
      handleDeleteUser(currentUser);
      alert(`${currentUser} has left the shopping list.`);
    }
  };

  const unresolvedItems = shoppingList.items.filter((item) => !item.resolved);
  const resolvedItems = shoppingList.items.filter((item) => item.resolved);

  return (
    <Box>
      {/* App Bar with User Dropdown */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value as string)}
            sx={{
              color: "white",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
            }}
          >
            <MenuItem value="John Doe">John Doe (Owner)</MenuItem>
            {shoppingList.members.map((member) => (
              <MenuItem key={member} value={member}>
                {member}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)", // Adjust height to account for AppBar
          textAlign: "center",
          padding: 2,
        }}
      >
        {/* Edit Name */}
        {isEditingName && shoppingList.owner === currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <TextField
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ marginRight: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditName}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            onClick={
              shoppingList.owner === currentUser ? toggleEditName : undefined
            }
            sx={{
              cursor:
                shoppingList.owner === currentUser ? "pointer" : "default",
              ":hover":
                shoppingList.owner === currentUser
                  ? { textDecoration: "underline" }
                  : undefined,
            }}
          >
            {shoppingList.name}
          </Typography>
        )}

        {/* Owner and Users */}
        <Typography variant="subtitle1">
          <strong>Owner:</strong> {shoppingList.owner}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Users:</strong> {shoppingList.members.join(", ")}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          {currentUser !== shoppingList.owner && (
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveShoppingList}
            >
              Leave Shopping List
            </Button>
          )}
          {currentUser === shoppingList.owner && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
              >
                Manage
              </Button>
              <Button variant="outlined" color="warning">
                Archive
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowResolved((prev) => !prev)}
          >
            {showResolved ? "Hide Resolved Items" : "Show Resolved Items"}
          </Button>
        </Box>

        {/* Add Item */}
        <Box sx={{ width: "100%", maxWidth: 500, marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Add a new item"
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </Box>

        {/* Unresolved Items */}
        <ItemList
          items={unresolvedItems}
          onResolve={handleResolveItem}
          onDelete={handleDeleteItem}
        />

        {/* Resolved Items Section */}
        {showResolved && resolvedItems.length > 0 && (
          <>
            <Divider sx={{ marginY: 3 }} />
            <Typography variant="h5" gutterBottom>
              Resolved Items
            </Typography>
            <ItemList
              items={resolvedItems}
              onResolve={() => {}}
              onDelete={handleDeleteItem}
            />
          </>
        )}

        {/* Manage Modal */}
        {isModalOpen && currentUser === shoppingList.owner && (
          <ManageModal
            members={shoppingList.members}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onDeleteList={handleDeleteList}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShoppingListPage;
