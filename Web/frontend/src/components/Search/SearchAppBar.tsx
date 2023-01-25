import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const appBarTheme = createTheme({
  palette: {
    primary: {
      main: "#333030",
    },
  },
});

export default function SearchAppBar() {
  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar
        position="static"
        sx={{ height: "10vh", justifyContent: "center", m: 0 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h1"
            sx={{
              m: 0,
              p: 0,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "4vw",
            }}
          >
            Bulb
          </Typography>
          <Paper
            sx={{
              borderRadius: 4,
              boxShadow: 0,
              width: "25vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <InputBase placeholder="Search" sx={{ p: 0, m: 0, ml: "1vw" }} />
            <IconButton
              type="button"
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
