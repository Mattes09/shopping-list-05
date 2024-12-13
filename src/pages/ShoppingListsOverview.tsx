import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  fetchShoppingLists,
  addShoppingList,
  deleteShoppingList,
} from "../utils/api";
import { ShoppingList } from "../mockData"; // You may still use this for type definitions

const ShoppingListsOverview: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<ShoppingList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch shopping lists from the server
  useEffect(() => {
    async function loadShoppingLists() {
      try {
        setIsLoading(true);
        const data = await fetchShoppingLists();
        setShoppingLists(data);
      } catch (err) {
        setError("Failed to load shopping lists.");
      } finally {
        setIsLoading(false);
      }
    }
    loadShoppingLists();
  }, []);

  // Add a new shopping list
  const handleAddList = async () => {
    if (newListName.trim()) {
      try {
        const newList = {
          name: newListName.trim(),
          owner: "Current User",
          members: [],
          items: [],
          archived: false,
        };

        const addedList = await addShoppingList(newList);
        setShoppingLists((prevLists) => [...prevLists, addedList]);
        setNewListName("");
        setIsModalOpen(false);
      } catch {
        setError("Failed to add shopping list.");
      }
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (list: ShoppingList) => {
    setListToDelete(list);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteList = async () => {
    if (listToDelete) {
      try {
        await deleteShoppingList(listToDelete.id);
        setShoppingLists((prevLists) =>
          prevLists.filter((list) => list.id !== listToDelete.id)
        );
      } catch {
        setError("Failed to delete shopping list.");
      } finally {
        setDeleteDialogOpen(false);
        setListToDelete(null);
      }
    }
  };

  // Archive a list (local only, no server interaction yet)
  const handleArchiveList = (id: number) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, archived: true } : list
      )
    );
  };

  // Separate active and archived lists
  const activeLists = shoppingLists.filter((list) => !list.archived);
  const archivedLists = shoppingLists.filter((list) => list.archived);

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      {isLoading ? (
        <Typography>Loading shopping lists...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Page Title */}
          <Typography variant="h4" gutterBottom>
            Shopping Lists Overview
          </Typography>

          {/* Add New List Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{ marginBottom: 4 }}
          >
            Add New List
          </Button>

          {/* Active Shopping Lists */}
          <Typography variant="h5" gutterBottom>
            Active Lists
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {activeLists.map((list) => (
              <Card key={list.id} sx={{ width: 300 }}>
                <CardContent>
                  <Typography variant="h6">{list.name}</Typography>
                  <Typography variant="subtitle2">
                    Owner: {list.owner}
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      component={Link}
                      to={`/list/${list.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ marginLeft: 1 }}
                      onClick={() => handleArchiveList(list.id)}
                    >
                      Archive
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ marginLeft: 1 }}
                      onClick={() => handleOpenDeleteDialog(list)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Archived Shopping Lists */}
          {archivedLists.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
                Archived Lists
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                {archivedLists.map((list) => (
                  <Card
                    key={list.id}
                    sx={{
                      width: 300,
                      bgcolor: "grey.300",
                      pointerEvents: "none",
                      opacity: 0.6,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{list.name}</Typography>
                      <Typography variant="subtitle2">
                        Owner: {list.owner}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </>
          )}

          {/* Add List Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="add-list-modal"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography id="add-list-modal" variant="h6" gutterBottom>
                Add New Shopping List
              </Typography>
              <TextField
                fullWidth
                label="List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddList}
              >
                Add List
              </Button>
            </Box>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Shopping List</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the shopping list{" "}
                <strong>{listToDelete?.name}</strong>?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button color="error" onClick={handleDeleteList}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ShoppingListsOverview;
