import React, { useState } from "react";
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
import { ShoppingList } from "../mockData";

// Mock data for initial shopping lists
const mockShoppingLists: ShoppingList[] = [
  {
    id: 1,
    name: "Sneakers",
    owner: "John Doe",
    members: ["Mates", "Mike"],
    items: [],
    archived: false,
  },
  {
    id: 2,
    name: "Groceries",
    owner: "Jane Smith",
    members: ["John", "Alex"],
    items: [],
    archived: false,
  },
  {
    id: 3,
    name: "Archived Example",
    owner: "Archived Owner",
    members: ["Old Member"],
    items: [],
    archived: true,
  },
];

const ShoppingListsOverview: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState(mockShoppingLists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<ShoppingList | null>(null);

  // Add a new shopping list
  const handleAddList = () => {
    if (newListName.trim()) {
      setShoppingLists((prevLists) => [
        ...prevLists,
        {
          id: Date.now(),
          name: newListName.trim(),
          owner: "Current User", // Replace with actual user logic
          members: [],
          items: [],
          archived: false,
        },
      ]);
      setNewListName("");
      setIsModalOpen(false);
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (list: ShoppingList) => {
    setListToDelete(list);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteList = () => {
    if (listToDelete) {
      setShoppingLists((prevLists) =>
        prevLists.filter((list) => list.id !== listToDelete.id)
      );
    }
    setDeleteDialogOpen(false);
    setListToDelete(null);
  };

  // Archive a list
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
              <Typography variant="subtitle2">Owner: {list.owner}</Typography>
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
    </Box>
  );
};

export default ShoppingListsOverview;
