import React, { ChangeEvent } from "react";

import {
  WithStyles,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import styles, { CssTextField } from "./styles";
import { IRepositoriesQuery } from "../../../../store/repositories";

type AppBarProps = {
  query: IRepositoriesQuery;
  onChangeLanguage: (param: ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (param: ChangeEvent<HTMLInputElement>) => void;
} & WithStyles<typeof styles>;

const AppBarComponent = ({
  classes,
  query,
  onChangeLanguage,
  onChangeDate
}: AppBarProps) => {

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Top Repositories
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Language"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "Language" }}
              onChange={onChangeLanguage}
            />
          </div>
          <div className={classes.search}>
            <CssTextField
              id="date"
              label="Since..."
              type="date"
              color="primary"
              defaultValue={query.date}
              classes={{ root: classes.inputRoot }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeDate}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(AppBarComponent);
