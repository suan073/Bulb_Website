import SearchAppBar from "../components/Search/SearchAppBar";
import SearchedCardContainer from "../components/Search/SearchedCardContainer";

import "./Page.scss";

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

export default function SearchPage() {
  return (
    <div className="SearchPageContainer">
      <SearchAppBar />
      <SearchedCardContainer data={dummyDataSets} />
    </div>
  );
}
