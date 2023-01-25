import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import LineGraph from "../Graph/LineGraph";

import "./Analysis.scss";

type chartData = {
  isBig: boolean;
  x_Data: string[];
  y_Data: number[];
};

type props = {
  chartData: chartData;
};

export default function AnalysisContainer(props: props) {
  const GraphAndData = () => {
    return (
      <Grid container columns={10} direction="column" sx={{ height: "90vh" }}>
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "#8b8687" }}
        >
          <Paper
            elevation={10}
            sx={{
              borderRadius: 0,
              width: "55vw",
              height: "50vh",
            }}
          >
            <LineGraph {...props.chartData} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "#a3a1a1" }}
        >
          <Paper
            elevation={10}
            sx={{
              borderRadius: 0,
              width: "55vw",
              height: "30vh",
            }}
          >
            ss
          </Paper>
        </Grid>
      </Grid>
    );
  };
  const VideoList = () => {
    return (
      <Paper
        elevation={10}
        sx={{
          borderRadius: 0,
          width: "35vw",
          height: "85vh",
        }}
      ></Paper>
    );
  };

  return (
    <div className="AnalysisContainer">
      <Grid
        container
        columns={10}
        spacing={0}
        direction="row"
        sx={{ width: "100vw", height: "90vh" }}
      >
        <Grid item xs={6}>
          {GraphAndData()}
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          xs={4}
          sx={{ backgroundColor: "#e3dede" }}
        >
          {VideoList()}
        </Grid>
      </Grid>
    </div>
  );
}
