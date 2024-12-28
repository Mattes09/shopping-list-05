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
  CircularProgress,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const ShoppingListPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [mockData, setMockData] = useState<ShoppingList[]>([]);
  const [isMock, setIsMock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResolved, setShowResolved] = useState(false);

  // Load the shopping list
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
          throw new Error(t("Shopping list not found on the server."));
        }
      } catch {
        const localMockData = JSON.parse(JSON.stringify(mockShoppingLists)); // Deep copy
        setMockData(localMockData);
        const fallbackList = localMockData.find(
          (list: ShoppingList) => list.id.toString() === id
        );
        if (fallbackList) {
          setShoppingList(fallbackList);
          setIsMock(true);
        } else {
          setError(t("Shopping list not found in mock data either."));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadShoppingList();
  }, [id, t]);

  // Update mock data
  const updateMockData = (updatedList: ShoppingList) => {
    const updatedMockData = mockData.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setMockData(updatedMockData);
    setShoppingList(updatedList);
  };

  // Add a new item
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
        .catch(() => setError(t("Failed to add item.")));
    }
    setNewItemName("");
  };

  // Resolve an item
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
        .catch(() => setError(t("Failed to resolve item.")));
    }
  };

  // Delete an item
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
        .catch(() => setError(t("Failed to delete item.")));
    }
  };

  // Manage members
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
        .catch(() => setError(t("Failed to add user.")));
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
        .catch(() => setError(t("Failed to delete user.")));
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
        .catch(() => setError(t("Failed to delete shopping list.")));
    }
  };

  // Filter visible items
  const visibleItems = showResolved
    ? shoppingList?.items
    : shoppingList?.items.filter((item) => !item.resolved);

  // Render
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

  return (
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
        <strong>{t("Owner")}:</strong> {shoppingList?.owner}
      </Typography>
      <Typography variant="subtitle1">
        <strong>{t("Members")}:</strong> {shoppingList?.members.join(", ")}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginY: 3 }}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          {t("Manage Members")}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowResolved((prev) => !prev)}
        >
          {showResolved ? t("Hide Resolved Items") : t("Show Resolved Items")}
        </Button>
      </Box>

      <Divider sx={{ marginY: 4, width: "100%" }} />

      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <TextField
          fullWidth
          label={t("Add a new item")}
          variant="outlined"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleAddItem}>
          {t("Add Item")}
        </Button>
      </Box>

      <Box sx={{ marginTop: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          {t("Items")}
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
  );
};

export default ShoppingListPage;
