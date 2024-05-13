import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoriteStore";
import Skeleton from "@mui/material/Skeleton";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardUI(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(props.loading); // State to manage loading
  const dispatch = useDispatch();
  const dataArray = useSelector((state) => state.favoriteItems.favData);
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1688561383440-feef3fee567d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnJlYWtpbmclMjBuZXdzfGVufDB8fDB8fHww";
  const isFavorite = (id) => dataArray.some((item) => item.title === id);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false); // Simulate data loading completion after 2 seconds
  //   }, 2000);
  // }, []);

  function handleAddToArray(props) {
    if (isFavorite(props.title)) {
      dispatch(removeFavorite({ id: props.title }));
    } else {
      dispatch(addFavorite({ id: props }));
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: 310,
        margin: 1,
        borderRadius: 5,
        border: 5,
        boxShadow: "20 grey",
        borderColor: "#3d52a0",
      }}
      style={{ backgroundColor: "#ede8f5" }}
    >
      {/* Display skeleton while loading */}
      {loading ? (
        <Skeleton variant="rectangular" height={194} />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={
            props.urlToImage != null || undefined ? props.urlToImage : imageUrl
          }
          // image={
          //   props.urlToImage != null || undefined || "[object Object]"
          //     ? props.urlToImage
          //     : imageUrl
          //       // <Skeleton variant="rectangular" height={194} />
          // }
          alt="news image"
        />
      )}

      <CardHeader
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        action={
          <IconButton
            aria-label="toggle favorite"
            onClick={() => handleAddToArray(props)}
          >
            {isFavorite(props.title) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorder style={{ color: "red" }} />
            )}
          </IconButton>
        }
        titleTypographyProps={{ variant: "h5" }}
        title={loading ? <Skeleton variant="text" width={150} /> : props.title}
        subheader={
          loading ? (
            <Skeleton variant="text" width={100} />
          ) : 
           props.author == null ? (
            "" + props.publishedAt
          ) : props.author.length > 20 ? (
                props.publishedAt
          ) : (
            props.author + "  " + props.publishedAt
          )
       
        }
      />

      <CardContent style={{ marginTop: "10px" }}>
        {loading ? (
          <Skeleton variant="text" width={200} height={50} />
        ) : (
          <a href={props.url} target={"_blank"}>
            read more
          </a>
        )}
      </CardContent>
    </Card>
  );
}
