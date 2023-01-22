import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import LineGraph from "../graph/LineGraph";

import "./MiniGraphCard.css";

type childProps = {
  data: JSON[];
  xName: string;
  lineName: string;
};

type props = {
  title: string;
  subtitle: string;
  line_props: childProps;
};

export default function MiniGraphCard(props: props) {
  return (
    <div className="MiniGraphCardContainer">
      <Card className="MiniGraphCard">
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <LightbulbIcon />
            </IconButton>
          }
          title={props.title}
          subheader={`Category: ${props.subtitle}`}
        />
        <CardContent>
          <LineGraph
            data={props.line_props.data}
            xName={props.line_props.xName}
            lineName={props.line_props.lineName}
          />
        </CardContent>
      </Card>
    </div>
  );
}
