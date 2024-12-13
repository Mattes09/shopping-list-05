import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingList } from "../mockData";

interface ShoppingListCardProps {
  list: ShoppingList;
  onArchive?: (id: number) => void;
  onDelete?: (list: ShoppingList) => void;
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({
  list,
  onArchive,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/list/${list.id}`);
  };

  return (
    <Card key={list.id} sx={{ width: 300 }}>
      <CardContent>
        <Typography variant="h6">{list.name}</Typography>
        <Typography variant="subtitle2">Owner: {list.owner}</Typography>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleView}
          >
            View
          </Button>
          {onArchive && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ marginLeft: 1 }}
              onClick={() => onArchive(list.id)}
            >
              Archive
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ marginLeft: 1 }}
              onClick={() => onDelete(list)}
            >
              Delete
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShoppingListCard;
