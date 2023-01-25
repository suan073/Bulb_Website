import SearchAppBar from "../components/Search/SearchAppBar";
import SearchedCardContainer from "../components/Search/SearchedCardContainer";

import "./Page.scss";

export default function SearchPage() {
  return (
    <div className="SearchPageContainer">
      <SearchAppBar />
      <SearchedCardContainer />
    </div>
  );
}
