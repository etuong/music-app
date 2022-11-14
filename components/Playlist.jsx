import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "@emotion/styled";
import { Folder } from "@mui/icons-material";
import { FolderOpen } from "@mui/icons-material";
import { useMusic } from "../providers/MusicProvider";

const Title = styled.div`
  font-size: 1.5em;
  margin-block-end: 0.4em;
  font-weight: bold;
`;

const Playlist = () => {
  // const [playlists] = useMusic();
  // const categories = Array.from(playlists.keys());
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  return (
    <Box sx={{ minWidth: 250, overflow: "auto", height: "100%" }}>
      <Title>Ethan's Playlists</Title>
      <Divider />
      <nav aria-label="main mailbox folders">
        <List
          sx={{
            "&& .Mui-selected, && .Mui-selected:hover": {
              bgcolor: "#3F7089",
              "&, & .MuiListItemIcon-root": {
                color: "white",
              },
            },
            "& .MuiListItemButton-root:hover": {
              bgcolor: "transparent",
              "&, & .MuiListItemIcon-root": {
                color: "#3F7089",
              },
            },
          }}
        >
          {/* {Array.isArray(categories) &&
            categories?.map((category, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(_event) => setSelectedIndex(index)}
                >
                  <ListItemIcon>
                    {selectedIndex === index ? <FolderOpen /> : <Folder />}
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))} */}
        </List>
      </nav>
    </Box>
  );
};

export default Playlist;
