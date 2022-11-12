import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { FolderOpen } from "@mui/icons-material";
import { Folder } from "@mui/icons-material";
import styled from "@emotion/styled";

const Title = styled.div`
  font-size: 1.5em;
  margin-block-end: 0.4em;
  font-weight: bold;
`;

function createData(name, calories) {
  return { name, calories };
}

const categories = [
  createData("Oldies", 1),
  createData("Chinese", 1),
  createData("Vietnamese", 1),
  createData("Workout", 1),
  createData("Study", 1),
  createData("Crying", 1),
  createData("Chill House", 1),
  createData("Breakup", 1),
];

const Playlist = () => {
  return (
    <Box sx={{ minWidth: 250 }}>
      <Title>Ethan's Playlists</Title>
      <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          {categories.map((category, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default Playlist;
