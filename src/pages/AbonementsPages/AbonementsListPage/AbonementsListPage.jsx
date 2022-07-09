import {
  Card,
  CardHeader,
  Button,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AbonementCard = ({ abonement }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader
        sx={{
          minHeight: 68,
          display: "inline-block",
          position: "relative",
        }}
        title={`Абонемент на ${abonement.title}`}
        subheader={`Цена ${abonement.price} в месяц`}
        titleTypographyProps={{
          verticalalign: "top",
        }}
        subheaderTypographyProps={{
          position: "absolute",
          bottom: 16,
        }}
      />
      <Typography sx={{ p: 2 }}>{abonement.description}</Typography>
    </Card>
  );
};

export default AbonementCard;
