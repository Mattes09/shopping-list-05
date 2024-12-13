import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchShoppingLists,
  updateShoppingList,
  deleteShoppingList,
} from "../utils/api";
import { shoppingLists as mockShoppingLists, ShoppingList } from "../mockData";
import ItemList from "../components/ItemList";
import ManageModal from "../components/ManageModal";
import {
  Box,
  Button,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  CircularProgress,
  Divider,
} from "@mui/material";

const ShoppingListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [mockData, setMockData] = useState<ShoppingList[]>([]); // Local mock data
  const [isMock, setIsMock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    const loadShoppingList = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchShoppingLists();
        const foundList = data.find(
          (list: { id: string | undefined }) => list.id === id
        );
        if (foundList) {
          setShoppingList(foundList);
          setIsMock(false);
        } else {
          throw new Error("Shopping list not found on the server.");
        }
      } catch {
        // Fallback to mock data
        const localMockData = JSON.parse(JSON.stringify(mockShoppingLists)); // Deep copy
        setMockData(localMockData);
        const fallbackList = localMockData.find(
          (list: ShoppingList) => list.id.toString() === id
        );
        if (fallbackList) {
          setShoppingList(fallbackList);
          setIsMock(true);
        } else {
          setError("Shopping list not found in mock data either.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadShoppingList();
  }, [id]);

  const updateMockData = (updatedList: ShoppingList) => {
    const updatedMockData = mockData.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setMockData(updatedMockData);
    setShoppingList(updatedList);
  };

  const handleAddItem = () => {
    if (!newItemName.trim() || !shoppingList) return;

    const newItem = {
      id: Date.now(),
      name: newItemName.trim(),
      resolved: false,
    };
    const updatedList = {
      ...shoppingList,
      items: [...shoppingList.items, newItem],
    };

    if (isMock) {
      updateMockData(updatedList);
    } else {
      updateShoppingList(shoppingList.id, updatedList)
        .then(() => setShoppingList(updatedList))
        .catch(() => setError("Failed to add item."));
    }
    setNewItemName("");
  };

  const handleResolveItem = (itemId: number) => {
    if (!shoppingList) return;

    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    };

    if (isMock) {
      updateMockData(updatedList);
    } else {
      updateShoppingList(shoppingList.id, updatedList)
        .then(() => setShoppingList(updatedList))
        .catch(() => setError("Failed to resolve item."));
    }
  };

  const handleDeleteItem = (itemId: number) => {
    if (!shoppingList) return;

    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    };

    if (isMock) {
      updateMockData(updatedList);
    } else {
      updateShoppingList(shoppingList.id, updatedList)
        .then(() => setShoppingList(updatedList))
        .catch(() => setError("Failed to delete item."));
    }
  };

  const handleAddUser = (userName: string) => {
    if (!userName.trim() || !shoppingList) return;

    const updatedList = {
      ...shoppingList,
      members: [...shoppingList.members, userName.trim()],
    };

    if (isMock) {
      updateMockData(updatedList);
    } else {
      updateShoppingList(shoppingList.id, updatedList)
        .then(() => setShoppingList(updatedList))
        .catch(() => setError("Failed to add user."));
    }
  };

  const handleDeleteUser = (userName: string) => {
    if (!shoppingList || !shoppingList.members.includes(userName)) return;

    const updatedList = {
      ...shoppingList,
      members: shoppingList.members.filter((member) => member !== userName),
    };

    if (isMock) {
      updateMockData(updatedList);
    } else {
      updateShoppingList(shoppingList.id, updatedList)
        .then(() => setShoppingList(updatedList))
        .catch(() => setError("Failed to delete user."));
    }
  };

  const handleDeleteList = () => {
    if (!shoppingList) return;

    if (isMock) {
      setMockData(mockData.filter((list) => list.id !== shoppingList.id));
      navigate("/");
    } else {
      deleteShoppingList(shoppingList.id)
        .then(() => navigate("/"))
        .catch(() => setError("Failed to delete shopping list."));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const visibleItems = showResolved
    ? shoppingList?.items
    : shoppingList?.items.filter((item) => !item.resolved);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Typography variant="h6">Shopping List</Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {shoppingList?.name}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Owner:</strong> {shoppingList?.owner}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Members:</strong> {shoppingList?.members.join(", ")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginY: 3 }}>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Manage Members
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowResolved((prev) => !prev)}
          >
            {showResolved ? "Hide Resolved Items" : "Show Resolved Items"}
          </Button>
        </Box>

        <Divider sx={{ marginY: 4, width: "100%" }} />

        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            fullWidth
            label="Add a new item"
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleAddItem}>
            Add Item
          </Button>
        </Box>

        <Box sx={{ marginTop: 4, width: "100%", maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Items
          </Typography>
          <ItemList
            items={visibleItems || []}
            onResolve={handleResolveItem}
            onDelete={handleDeleteItem}
          />
        </Box>

        {isModalOpen && shoppingList && (
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
