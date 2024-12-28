import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Backdrop,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

interface ManageModalProps {
  members: string[];
  onAddUser: (name: string) => void;
  onDeleteUser: (name: string) => void;
  onDeleteList: () => void;
  onClose: () => void;
}

const ManageModal: React.FC<ManageModalProps> = ({
  members,
  onAddUser,
  onDeleteUser,
  onDeleteList,
  onClose,
}) => {
  const [newUserName, setNewUserName] = useState("");
  const theme = useTheme(); // Access the current theme
  const { t } = useTranslation(); // Access the translation function

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName(""); // Clear the input after adding
    }
  };

  return (
    <Backdrop open={true} sx={{ zIndex: 1300 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper", // Dynamically set based on theme
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: "text.primary", // Ensure text color adapts to theme
        }}
      >
        <Typography variant="h6" gutterBottom>
          {t("Manage List")}
        </Typography>

        {/* Add User Section */}
        <Typography variant="subtitle1" gutterBottom>
          {t("Add User")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <TextField
            fullWidth
            label={t("Enter user name")}
            variant="outlined"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddUser}>
            {t("Add")}
          </Button>
        </Box>

        {/* Delete User Section */}
        <Typography variant="subtitle1" gutterBottom>
          {t("Delete User")}
        </Typography>
        {members && members.length > 0 ? (
          <List>
            {members.map((member, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText primary={member} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  onClick={() => onDeleteUser(member)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            {t("No users in the list.")}
          </Typography>
        )}

        {/* Delete List Section */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={onDeleteList}
        >
          {t("Delete List")}
        </Button>

        {/* Close Modal */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ marginTop: 1 }}
          onClick={onClose}
        >
          {t("Close")}
        </Button>
      </Box>
    </Backdrop>
  );
};

export default ManageModal;
