import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

interface Item {
  id: number;
  name: string;
  resolved: boolean;
}

interface ItemListProps {
  items: Item[];
  onResolve: (id: number) => void;
  onDelete: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onResolve, onDelete }) => {
  const { t } = useTranslation();

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} sx={{ display: "flex", alignItems: "center" }}>
          <ListItemText primary={item.name} />

          {/* Show Resolve Button only for Unresolved Items */}
          {!item.resolved && (
            <IconButton
              onClick={() => onResolve(item.id)}
              sx={{ color: "green" }}
              title={t("Resolve")}
            >
              <CheckCircleIcon />
            </IconButton>
          )}

          {/* Delete Button for both Resolved and Unresolved Items */}
          <IconButton
            onClick={() => onDelete(item.id)}
            sx={{ color: "red" }}
            title={t("Delete")}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
