import React from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import LineGraph from "../Graph/LineGraph";

import "./Analysis.scss";

type props = {
  chartData: any;
};

export default function AnalysisContainer(props: props) {
  const [graphData, setGraphData] = React.useState<any>(props.chartData);

  React.useEffect(() => {
    setGraphData(props.chartData);
  }, [props.chartData]);

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
            <LineGraph
              isBig={graphData.isBig}
              x_Data={JSON.parse(graphData.x_data.replace(/'/g, '"'))}
              y_Data={JSON.parse(graphData.y_data)}
            />
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
            <Grid
              container
              columns={9}
              direction="column"
              sx={{ width: "55vw", height: "30vh" }}
            >
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "2vw" }}
                >
                  평균 조회수: {graphData.average_view}회
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "2vw" }}
                >
                  최고 조회수: {graphData.max_view}회
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "2vw" }}
                >
                  평균 영상 시간:{" "}
                  {parseInt(String(graphData.avg_video_length / 60))}분{" "}
                  {parseInt(String(graphData.avg_video_length % 60))}초
                </Typography>
              </Grid>
            </Grid>
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
        style={{ overflow: "auto" }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ my: "2vh" }}
        >
          {JSON.parse('{"videos":[' + graphData.top5links + "]}").videos.map(
            (video: any, index: any) => (
              <Card key={index} sx={{ display: "flex", boxShadow: 10 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={
                    "https://img.youtube.com/vi/" +
                    video.youtube_link.split("v=")[1] +
                    "/0.jpg"
                  }
                  alt=""
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="h2"
                      sx={{ fontWeight: "bold", fontSize: "1.7vw" }}
                    >
                      {"조회수: "}
                      {video.view}
                      {"회"}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="a"
                      href={video.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.video_name}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            )
          )}
        </Stack>
      </Paper>
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
