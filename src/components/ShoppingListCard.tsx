import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingList } from "../mockData";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/list/${list.id}`);
  };

  return (
    <Card key={list.id} sx={{ width: 300, margin: "auto" }}>
      <CardContent>
        <Typography variant="h6" align="center">
          {list.name}
        </Typography>
        <Typography variant="subtitle2" align="center" sx={{ marginBottom: 2 }}>
          {t("Owner")}: {list.owner}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap", // Wrap buttons for smaller screens
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: 90 }}
            onClick={handleView}
          >
            {t("View")}
          </Button>
          {onArchive && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ minWidth: 90 }}
              onClick={() => onArchive(list.id)}
            >
              {t("Archive")}
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ minWidth: 90 }}
              onClick={() => onDelete(list)}
            >
              {t("Delete")}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShoppingListCard;
