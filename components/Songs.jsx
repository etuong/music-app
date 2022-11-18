import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMusic } from "../providers/MusicProvider";
import { getSongNameWithExt } from "../utilities/utils";
import { memo } from "react";

const Songs = () => {
  const { songs, handleSongChange, currentSong } = useMusic();

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs?.map((row, index) => (
            <TableRow
              key={index}
              onDoubleClick={() => handleSongChange(index)}
              selected={getSongNameWithExt(currentSong) === row}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "default",
              }}
            >
              <TableCell sx={{ userSelect: "none" }}>{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(Songs);
