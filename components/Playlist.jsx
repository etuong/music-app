import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioIcon from "@mui/icons-material/Radio";
import styled from "@emotion/styled";
import { Folder, FolderOpen } from "@mui/icons-material";
import { memo } from "react";
import { useMusic } from "../providers/MusicProvider";

const Title = styled.div`
  font-size: 1.5em;
  margin-block-end: 0.4em;
  font-weight: bold;
`;

const Playlist = () => {
  const { playlists, radioList, handlePlaylistChange, handleRadioChange } = useMusic();
  const [categories, setCategories] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  React.useEffect(() => {
    const playlistKeys = Object.keys(playlists);
    if (playlistKeys.length > 0) {
      setCategories(playlistKeys);
      selectCategory(radioList.length, playlistKeys);
    }
  }, [playlists, radioList.length]);

  const selectCategory = (index, categories) => {
    setSelectedIndex(index);
    handlePlaylistChange(categories[index - radioList.length]);
  };

  const selectRadio = (index) => {
    setSelectedIndex(index);
    handleRadioChange(radioList[index]);
  };

  return (
    <Box sx={{ minWidth: 250, overflow: "auto", height: "100%" }}>
      <Title>Ethan's Music</Title>
      <Divider />
      <List sx={{
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
      }}>
        {radioList.map((channel, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => selectRadio(index)}
            >
              <ListItemIcon>
                <RadioIcon />
              </ListItemIcon>
              <ListItemText primary={channel.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ marginY: "10px" }} />
        {categories.map((category, i) => {
          const index = i + radioList.length;
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => selectCategory(index, categories)}
              >
                <ListItemIcon>
                  {selectedIndex === index ? <FolderOpen /> : <Folder />}
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default memo(Playlist);

