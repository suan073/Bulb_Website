import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SearchAppBar from "../components/Search/SearchAppBar";
import SearchedCardContainer from "../components/Search/SearchedCardContainer";

import "./Page.scss";

// const dummyDataSet1 = {
//   title: "Dummy",
//   isBig: false,
//   x_Data: [
//     "2022-12-01",
//     "2022-12-05",
//     "2022-12-10",
//     "2022-12-15",
//     "2022-12-20",
//     "2022-12-25",
//     "2022-12-31",
//   ],
//   y_Data: [20, 100, 180, 160, 130, 120, 110],
// };

const dummyDataSets = [1];

export default function SearchPage() {
  const { key } = useParams();
  const apiKey = process.env.API_KEY as string;

  const [data, setData] = React.useState(dummyDataSets);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiKey + "api/topic/list/" + key);
        setData(response.data);
      } catch (error) {
        setData(dummyDataSets);
      }
    };
    fetchData();
  }, [key]);

  return (
    <div className="SearchPageContainer">
      <SearchAppBar />
      <SearchedCardContainer data={data} />
    </div>
  );
}
