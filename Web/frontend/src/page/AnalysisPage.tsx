import AnalysisAppBar from "../components/Analysis/AnalysisAppBar";
import AnalysisContainer from "../components/Analysis/AnalysisContainer";

import "./Page.scss";

const chartData = {
  title: "Dummy",
  isBig: true,
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

export default function AnalysisPage() {
  return (
    <div className="AnalysisPageContainer">
      <AnalysisAppBar title={chartData.title} />
      <AnalysisContainer chartData={chartData} />
    </div>
  );
}
