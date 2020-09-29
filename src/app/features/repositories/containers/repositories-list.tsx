import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import throttle from "lodash.debounce";
import { format, subDays } from "date-fns";
import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
  Grid,
} from "@material-ui/core";
import {
  PageChangeParams,
  RowSelectedParams,
  SortModelParams,
} from "@material-ui/data-grid";

import {
  repositories,
  getRepositories,
  IRepositoriesQuery,
  IRepository,
} from "../../../store/repositories";
import DataTable from "../components/data-table";
import RepositoryItem from "./repository-item";
import AppBar from "../components/appbar/appbar";
import Error from "../components/error";

const styles: (theme: Theme) => StyleRules<string> = (theme) =>
  createStyles({
    grid: {
      height: "calc(100vh - 8rem)",
    },
  });

type RepositoriesProps = {} & WithStyles<typeof styles>;

const RepositoriesList = ({ classes }: RepositoriesProps) => {
  const { data, isLoading, error, total } = useSelector(repositories);
  const dispatch = useDispatch();
  const [query, setQuery] = useState<IRepositoriesQuery>({
    perPage: 10,
    page: 1,
    date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    sort: "stars",
    order: "desc",
  });

  const [repository, setRepository] = useState<IRepository>({
    id: 0,
  } as IRepository);

  const changeQuery = (obj: IRepositoriesQuery): any => {
    setQuery({
      ...query,
      ...obj,
    });
  };

  const onPerPageChange = (param: PageChangeParams) => {
    if (param.pageSize !== query.perPage) {
      changeQuery({ perPage: param.pageSize });
    }
  };
  const onPageChange = (param: PageChangeParams) => {
    if (param.page !== query.page) {
      changeQuery({ page: param.page });
    }
  };
  const onSortChange = (params: SortModelParams) => {
    if (
      params.sortModel.length &&
      !isLoading &&
      params.sortModel[0].sort !== query.order
    ) {
      changeQuery({
        order: params.sortModel[0].sort as string,
      });
    }
  };
  const onRowSelected = (params: RowSelectedParams) => {
    setRepository(params.data as IRepository);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    changeQuery({ date: e.target.value });
  };

  const test = throttle(changeQuery, 500, {
    leading: false,
    trailing: true,
  });

  const onChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    test({ language: e.target.value });
  };

  useEffect(() => {
    dispatch(getRepositories(query));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Fragment>
      <Error error={error} />
      <Grid container>
        <AppBar
          query={query}
          onChangeDate={onChangeDate}
          onChangeLanguage={onChangeLanguage}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item className={classes.grid} xs={12} sm={3}>
          <DataTable
            isLoading={isLoading}
            data={data}
            total={total}
            query={query}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
            onPerPageChange={onPerPageChange}
            onRowSelected={onRowSelected}
          />
        </Grid>
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          className={classes.grid}
          xs={12}
          sm={9}
        >
          <RepositoryItem id={repository.id} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(RepositoriesList);
