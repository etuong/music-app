import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getSongNameWithExt } from "../utilities/utils";
import { useMusic } from "../providers/MusicProvider";
import { styled } from "@mui/material/styles";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.3)",
}));

const SongList = () => {
  const { currentSong, currentRadio, isPlaying, handleSongChange, songs } =
    useMusic();

  if (currentRadio) {
    return (
      <div className="radio-container">
        <img
          src={`${currentRadio.cover}`}
          className={`rotate-animation ${isPlaying ? "" : "pause"} desktop`}
          alt=""
        />
      </div>
    );
  }

  return (
    <StyledTableContainer component={Paper} sx={{ height: "100%" }}>
      <Table stickyHeader size="small" aria-label="song list">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs?.map((song, index) => (
            <TableRow
              key={index}
              onDoubleClick={() => handleSongChange(index)}
              selected={getSongNameWithExt(currentSong) === song}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "default",
              }}
            >
              <TableCell sx={{ userSelect: "none" }}>{song}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SongList;

