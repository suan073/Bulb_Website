import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import "./Main.scss";

export default function MainPageContainer() {
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
              data-heading="l"
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
            <Grid container direction="column" alignItems="center">
              <Grid item sx={{ mb: "4vh" }}>
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
                  유튜브의 최근 동향을 알아보세요!
                </Typography>
              </Grid>
              <Grid item>
                <Paper
                  component="form"
                  sx={{
                    m: 0,
                    p: 0,
                    borderRadius: 4,
                    width: "40vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: 0,
                  }}
                >
                  <InputBase
                    placeholder="Search"
                    sx={{ p: 0, m: 0, ml: "1vw" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: 0, m: 0, mr: "1vw", color: "black" }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
