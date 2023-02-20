import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

type props = { data: Array<any> };

export default function SearchedCardContainer(props: props) {
  const [page, setPage] = React.useState(1);
  const [graphData, setGraphData] = React.useState<Array<any>>([]);
  const apiKey = process.env.API_KEY as string;
  const navigate = useNavigate();

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  React.useEffect(() => {
    async function fetchData(ids: Array<number>) {
      try {
        const promises = ids.map(async (id) => {
          const res = await axios.get(apiKey + `api/analysis/Brief/${id}`);
          return res.data;
        });
        const data = await Promise.all(promises);
        setGraphData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(props.data);
  }, [props.data]);

  const renderGraphCard = () => {
    return graphData
      .slice(
        (page - 1) * 12,
        page * 12 < props.data.length ? page * 12 : props.data.length
      )
      .map((dataSet, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              width: "22vw",
              height: "24vh",
              mx: "2vh",
              my: "1vh",
            }}
          >
            <Paper
              component="form"
              sx={{
                borderRadius: 0,
                boxShadow: 3,
                width: "22vw",
                height: "4vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`../../analysis/${dataSet.topic_id}`);
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
                {dataSet.topic_name}
              </Typography>
              <IconButton
                type="submit"
                sx={{ p: 0, m: 0, mr: "0.5vw", color: "black" }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <LineGraph
              isBig={dataSet.isBig}
              x_Data={JSON.parse(dataSet.x_data.replace(/'/g, '"'))}
              y_Data={JSON.parse(dataSet.y_data)}
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
          {renderGraphCard()}
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
                Math.floor(props.data.length / 12) +
                (props.data.length % 12 == 0 ? 0 : 1)
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
