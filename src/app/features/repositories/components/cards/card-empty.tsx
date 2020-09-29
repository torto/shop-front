import React from "react";
import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
  CardContent,
  CardHeader,
  Card,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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
  });

type CardEmptyProps = {} & WithStyles<typeof styles>;

const CardEmpty = ({ classes }: CardEmptyProps) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CardEmpty);
