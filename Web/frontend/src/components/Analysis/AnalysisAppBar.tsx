import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const appBarTheme = createTheme({
  palette: {
    primary: {
      main: "#333030",
    },
  },
});

type props = {
  title: string;
};

export default function AnalysisAppBar(props: props) {
  const [keyWord, setKeyWord] = React.useState("");
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar
        position="static"
        sx={{ height: "10vh", justifyContent: "center", m: 0 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            type="button"
            size="large"
            sx={{ p: 0, m: 0, color: "white" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h1"
            sx={{
              m: 0,
              p: 0,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "3vw",
            }}
          >
            키워드 - {props.title}
          </Typography>
          <Paper
            component="form"
            sx={{
              borderRadius: 4,
              boxShadow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`../../search/${keyWord}`);
            }}
          >
            <InputBase
              placeholder="Search"
              sx={{ p: 0, m: 0, ml: "1vw", width: "10vw" }}
              onChange={(event) => {
                setKeyWord(event.target.value);
              }}
            />
            <IconButton
              type="submit"
              sx={{ p: 0, m: 0, mr: "1vw", color: "black" }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
