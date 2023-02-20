import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import AnalysisAppBar from "../components/Analysis/AnalysisAppBar";
import AnalysisContainer from "../components/Analysis/AnalysisContainer";

import "./Page.scss";

const chartData = {
  analysis_id: 4,
  topic_id: 4,
  topic_name: "Dummy",
  average_view: 180000,
  max_view: 180000,
  lastest_updatetime: "2023-02-15T20:37:14",
  top5links:
    '{"view": 180000.0, "video_name": "\\ud587\\ubc18 \\uc21c\\uc0ad \\uc2dc\\ud0a4\\ub294 \\uc591\\ub150\\ub300\\ucc3d\\uacf1\\ucc3d\\uc5d0 \\uc6b0\\ub3d9\\uc0ac\\ub9ac\\ucd94\\uac00! \\uadf8\\ub9ac\\uace0 \\uc624\\uc774\\uc18c\\ubc15\\uc774 \\uba39\\ubc29~!! \\ub9ac\\uc5bc\\uc0ac\\uc6b4\\ub4dc ASMR Mukbang(Eating Show)", "youtube_link": "https://youtube.com/watch?v=SIrnEpt5_2Q"}',
  avg_video_length: 898,
  x_data:
    "['2022-12-17', '2022-12-18', '2022-12-19', '2022-12-20', '2022-12-21', '2022-12-22', '2022-12-23', '2022-12-24', '2022-12-25', '2022-12-26', '2022-12-27', '2022-12-28', '2022-12-29', '2022-12-30', '2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09', '2023-01-10', '2023-01-11', '2023-01-12', '2023-01-13', '2023-01-14', '2023-01-15', '2023-01-16', '2023-01-17', '2023-01-18', '2023-01-19', '2023-01-20', '2023-01-21', '2023-01-22', '2023-01-23', '2023-01-24', '2023-01-25', '2023-01-26', '2023-01-27', '2023-01-28', '2023-01-29', '2023-01-30', '2023-01-31', '2023-02-01', '2023-02-02', '2023-02-03', '2023-02-04', '2023-02-05', '2023-02-06', '2023-02-07', '2023-02-08', '2023-02-09', '2023-02-10', '2023-02-11', '2023-02-12', '2023-02-13', '2023-02-14']",
  y_data:
    "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
  isBig: true,
};

export default function AnalysisPage() {
  const { key } = useParams();
  const apiKey = process.env.API_KEY as string;

  const [data, setData] = React.useState(chartData);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiKey + "api/analysis/Detail/" + key);
        setData(response.data);
      } catch (error) {
        setData(chartData);
      }
    };
    fetchData();
  }, [key]);

  return (
    <div className="AnalysisPageContainer">
      <AnalysisAppBar title={data.topic_name} />
      <AnalysisContainer chartData={data} />
    </div>
  );
}
