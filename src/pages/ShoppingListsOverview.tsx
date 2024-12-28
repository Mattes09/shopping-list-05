import React, { useState, useEffect } from "react";
import {
  Box,
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
import {
  fetchShoppingLists,
  addShoppingList,
  deleteShoppingList,
} from "../utils/api";
import ShoppingListCard from "../components/ShoppingListCard";
import { ShoppingList } from "../mockData";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const ShoppingListsOverview: React.FC = () => {
  const { t } = useTranslation();
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<ShoppingList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch shopping lists on initial load
  useEffect(() => {
    let isMounted = true;

    async function loadShoppingLists() {
      try {
        setIsLoading(true);
        const data = await fetchShoppingLists();
        if (isMounted) setShoppingLists(data);
      } catch (err) {
        if (isMounted) setError(t("Failed to load shopping lists."));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadShoppingLists();

    return () => {
      isMounted = false;
    };
  }, []); // Run only once on component mount

  // Update error messages when language changes
  useEffect(() => {
    if (error) {
      setError(t("Failed to load shopping lists."));
    }
  }, [i18n.language]); // React to language changes

  // Add a new shopping list
  const handleAddList = async () => {
    if (newListName.trim()) {
      try {
        const newList = {
          name: newListName.trim(),
          owner: t("Current User"),
          members: [],
          items: [],
          archived: false,
        };

        const addedList = await addShoppingList(newList);
        setShoppingLists((prevLists) => [...prevLists, addedList]);
        setNewListName("");
        setIsModalOpen(false);
      } catch {
        setError(t("Failed to add shopping list."));
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
        setError(t("Failed to delete shopping list."));
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
        <Typography>{t("Loading shopping lists...")}</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Page Title */}
          <Typography variant="h4" gutterBottom>
            {t("Shopping Lists")}
          </Typography>

          {/* Add New List Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{ marginBottom: 4 }}
          >
            {t("Add New List")}
          </Button>

          {/* Active Shopping Lists */}
          <Typography variant="h5" gutterBottom>
            {t("Active Lists")}
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
              <ShoppingListCard
                key={list.id}
                list={list}
                onArchive={handleArchiveList}
                onDelete={handleOpenDeleteDialog}
              />
            ))}
          </Box>

          {/* Archived Shopping Lists */}
          {archivedLists.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
                {t("Archived Lists")}
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
                  <ShoppingListCard key={list.id} list={list} />
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
                {t("Add New Shopping List")}
              </Typography>
              <TextField
                fullWidth
                label={t("List Name")}
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
                {t("Add List")}
              </Button>
            </Box>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>{t("Delete Shopping List")}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("Are you sure you want to delete the shopping list")}{" "}
                <strong>{listToDelete?.name}</strong>?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>
                {t("Cancel")}
              </Button>
              <Button color="error" onClick={handleDeleteList}>
                {t("Delete")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ShoppingListsOverview;
