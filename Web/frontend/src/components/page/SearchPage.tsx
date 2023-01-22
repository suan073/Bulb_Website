import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import MiniGraphCard from "../card/MiniGraphCard";

import { dummy_data_set } from "./SearchPageDummyData";

import "./SearchPage.css";

export default function SearchPage() {
  return (
    <div className="page">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{
              marginTop: "5vh",
              marginBottom: "5vh",
              display: "absolute",
              alignItems: "center",
              width: "60vw",
            }}
          >
            <InputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search topic" }}
              sx={{ paddingLeft: "1vw", width: "57vw" }}
            />
            <IconButton type="button" aria-label="search topic">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "10vh" }}>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            style={{ minWidth: "80vw" }}
          >
            {dummy_data_set.map((data) => (
              <Grid item xs={3}>
                <MiniGraphCard
                  title={data.title}
                  subtitle={data.subtitle}
                  line_props={data.line_props}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
