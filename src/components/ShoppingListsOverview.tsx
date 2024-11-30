import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingList } from "../mockData";

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
];

const ShoppingListsOverview: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState(mockShoppingLists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

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

  // Delete a shopping list
  const handleDeleteList = (id: number) => {
    setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Lists Overview
      </Typography>

      {/* Add New List Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Add New List
      </Button>

      {/* Shopping Lists Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {shoppingLists.map((list) => (
          <Box
            key={list.id}
            sx={{
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{list.name}</Typography>
                <Typography variant="subtitle2">Owner: {list.owner}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    component={Link}
                    to={`/list/${list.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  >
                    View
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

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
    </Box>
  );
};

export default ShoppingListsOverview;
