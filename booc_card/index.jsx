import React from "react";
import Link from "next/link";


import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BsTrash } from "react-icons/bs";

function Cards({ name, href, username }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Card variant="outlined">{name}</Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {username}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={href}>
          <Button size="small">подробное</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default Cards;
