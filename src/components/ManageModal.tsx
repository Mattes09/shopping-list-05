import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

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

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName("");
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="manage-list-title"
      aria-describedby="manage-list-description"
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
        <Typography
          id="manage-list-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Manage List
        </Typography>

        {/* Add User Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 3,
          }}
        >
          <TextField
            fullWidth
            label="Enter user name"
            variant="outlined"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            sx={{ flexShrink: 0 }}
          >
            Add User
          </Button>
        </Box>

        {/* Manage Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              if (members.length > 0) {
                onDeleteUser(members[members.length - 1]); // Example: Delete the last user
              }
            }}
          >
            Delete User
          </Button>
          <Button variant="outlined" color="warning" onClick={onDeleteList}>
            Delete List
          </Button>
        </Box>

        {/* Close Button */}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ManageModal;
