import ImageListItem from "@mui/material/ImageListItem";

import "./Page.scss";

export default function LoadingPage() {
  return (
    <div className="LoadingPage">
      <div className="icon">
        <ImageListItem sx={{ width: "16vw" }}>
          <img src="./icon.png" />
        </ImageListItem>
      </div>
    </div>
  );
}
