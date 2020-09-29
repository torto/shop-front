import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  repository,
  getRepository,
  toggleStar
} from "../../../store/repository";

import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
} from "@material-ui/core";
import CardRepository from '../components/cards/card-repository'
import CardEmpty from '../components/cards/card-empty'

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
    numberStar:{
      paddingTop: theme.spacing(1)
    }
  });

type RepositoryProps = { id: number } & WithStyles<typeof styles>;

const RepositoriesItem = ({ classes, id }: RepositoryProps) => {
  const {
    data: {
      name = "",
      html_url = "",
      description = "",
      created_at = "",
      avatar_url = "",
      type = "",
      login = "",
      stargazers_count = 0,
      isStar = false,
    },
  } = useSelector(repository);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(id) {
      dispatch(getRepository(id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleToggleStar = () => {
      dispatch(toggleStar(id));
  }

  return (
    <Fragment>
      {name && (
        <CardRepository
          name={name}
          html_url={html_url}
          description={description}
          login={login}
          type={type}
          created_at={created_at}
          avatar_url={avatar_url}
          stargazers_count={stargazers_count}
          isStar={isStar}
          handleToggleStar={handleToggleStar}
        />
      )}
      {!name && <CardEmpty />}
    </Fragment>
  );
};

export default withStyles(styles)(RepositoriesItem);
