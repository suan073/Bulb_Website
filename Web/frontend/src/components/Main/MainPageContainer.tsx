import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import "./Main.scss";

export default function MainPageContainer() {
  const [keyWord, setKeyWord] = React.useState("");
  const navigate = useNavigate();

  return (
    <div className="MainPageContainer">
      <div className="TitleContainer">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          spacing={0}
        >
          <Grid item>
            <Typography
              className="TitleBulb"
              variant="h1"
              sx={{
                m: 0,
                p: 0,
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16vw",
              }}
            >
              Bulb
            </Typography>
          </Grid>
          <Grid item>
            <Paper
              component="form"
              sx={{
                m: 0,
                p: 0,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: 0,
              }}
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`search/${keyWord}`);
              }}
            >
              <InputBase
                placeholder="Search"
                onChange={(event) => {
                  setKeyWord(event.target.value);
                }}
                sx={{
                  p: 0,
                  m: 0,
                  ml: "2vw",
                  width: "20vw",
                  height: "6vh",
                  fontSize: "2vw",
                  fontWeight: "bold",
                }}
              />
              <IconButton
                type="submit"
                sx={{ p: 0, m: 0, mr: "1vw", color: "black" }}
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
