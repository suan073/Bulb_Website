import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import LineGraph from "../Graph/LineGraph";

import "./Search.scss";

const dummyDataSet = {
  title: "Dummy",
  isBig: false,
  x_Data: [
    "2022-12-01",
    "2022-12-05",
    "2022-12-10",
    "2022-12-15",
    "2022-12-20",
    "2022-12-25",
    "2022-12-31",
  ],
  y_Data: [20, 100, 180, 160, 130, 120, 110],
};

const dummyDataSets = [
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
  dummyDataSet,
];

type dataSets = {
  title: string;
  isBig: boolean;
  x_Data: string[];
  y_Data: number[];
};

export default function SearchedCardContainer() {
  const [dataSets] = React.useState(dummyDataSets);
  const [page, setPage] = React.useState(1);

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  const renderGraphCard = (dataSets: dataSets[]) => {
    return dataSets
      .slice(
        (page - 1) * 12,
        page * 12 < dataSets.length ? page * 12 : dataSets.length
      )
      .map((dataSet, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              borderRadius: 2,
              boxShadow: 1,
              width: "24vw",
              height: "24vh",
              mx: "0.6vh",
              my: "1vh",
            }}
          >
            <Paper
              sx={{
                borderRadius: 0,
                boxShadow: 1,
                width: "24vw",
                height: "4vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  m: 0,
                  p: 0,
                  ml: "0.5vw",
                  fontWeight: "bold",
                  fontSize: "1.5vw",
                }}
              >
                {dataSet.title}
              </Typography>
              <IconButton
                type="button"
                sx={{ p: 0, m: 0, mr: "0.5vw", color: "black" }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <LineGraph
              isBig={dataSet.isBig}
              x_Data={dataSet.x_Data}
              y_Data={dataSet.y_Data}
            />
          </Paper>
        </Grid>
      ));
  };

  return (
    <div className="SearchedCardContainer">
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        width="100vw"
        height="90vh"
      >
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
          sx={{ p: 0, mt: "3vh" }}
        >
          {renderGraphCard(dataSets)}
        </Grid>
        <Grid item sx={{ p: 0, m: 0, mb: "3vh" }}>
          <Paper
            sx={{
              borderRadius: 4,
              boxShadow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={
                Math.floor(dataSets.length / 12) +
                (dataSets.length % 12 == 0 ? 0 : 1)
              }
              defaultPage={1}
              boundaryCount={2}
              page={page}
              onChange={pageChangeHandler}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
