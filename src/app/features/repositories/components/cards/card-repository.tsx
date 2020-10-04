import React from "react";

import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
  Link,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton
} from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import github from "../../../../../github.png";
import { formatRFC7231 } from "date-fns";

const styles: (theme: Theme) => StyleRules<string> = (theme) =>
  createStyles({
    card: {
      minWidth: "90%",
      maxWidth: "90%",
    },
    media: {
      height: 0,
      paddingTop: "23%",
    },
    avatar: {
      backgroundColor: red[500],
    },
    numberStar: {
      paddingTop: theme.spacing(1),
    },
  });

type CardRepositoryProps = {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  avatar_url: string;
  type: string;
  login: string;
  stargazers_count: number;
  isStar: boolean;
  handleToggleStar: () => void;
} & WithStyles<typeof styles>;

const CardRepository = ({
  classes,
  name,
  html_url,
  description,
  created_at,
  avatar_url,
  stargazers_count,
  type,
  login,
  isStar,
  handleToggleStar,
}: CardRepositoryProps) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          avatar_url ? (
            <Avatar aria-label="recipe" src={avatar_url} />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name[0].toUpperCase()}
            </Avatar>
          )
        }
        title={
          <strong>
            {type} - {login}
          </strong>
        }
        subheader={`Created - ${formatRFC7231(new Date(created_at))}`}
      />
      <CardMedia className={classes.media} image={github} title="Paella dish" />
      <CardContent>
        <Link href={html_url} target="_blank" variant="h5">
          {name}
        </Link>
        <Typography></Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            handleToggleStar();
          }}
        >
          {isStar ? (
            <Star />
          ) : (
            <StarBorder />
          )}
        </IconButton>
        <Typography
          className={classes.numberStar}
          color="textSecondary"
          gutterBottom
        >
          {stargazers_count}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CardRepository);
