import React, { useLayoutEffect, useRef, useState } from "react";

import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  WithStyles,
} from "@material-ui/core";
import { IRepository, IRepositoriesQuery } from "../../../store/repositories/model";
import {
  ColDef,
  DataGrid,
  PageChangeParams,
  SortModelParams,
  SortModel,
  SortDirection,
  RowSelectedParams,
} from "@material-ui/data-grid";

const styles: (theme: Theme) => StyleRules<string> = (theme) =>
  createStyles({
    root: {
      marginTop: '1.2rem',
      marginLeft: '0.5rem'
    },
  });

type DataTableComponentProps = {
  isLoading: boolean;
  data: [IRepository] | [];
  total: number;
  query: IRepositoriesQuery;
  onPageChange: (param: PageChangeParams) => void;
  onSortChange: (params: SortModelParams) => void;
  onPerPageChange: (params: PageChangeParams) => void;
  onRowSelected: (params: RowSelectedParams) => void;
} & WithStyles<typeof styles>;

const DataTableComponent = ({
  classes,
  isLoading,
  data,
  total,
  query,
  onPageChange,
  onSortChange,
  onPerPageChange,
  onRowSelected,
}: DataTableComponentProps) => {

 const [width, setWidth] = useState(330);
  const ref:any = useRef(null);
  
  
  useLayoutEffect(() => {
    const handleResize = () => {
      console.log(ref.current);

      setWidth(ref.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatWidth = width / 2 - 15;

  const sortModel: SortModel = [
    { field: "stargazers_count", sort: query.order as SortDirection },
  ];
  const columns: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: formatWidth,
      sortable: false,
    },
    {
      field: "stargazers_count",
      headerName: "Starts",
      type: "number",
      width: formatWidth,
    },
  ];

  return (
    <DataGrid
      ref={ref}
      className={classes.root}
      rows={data}
      columns={columns}
      rowCount={total}
      loading={isLoading}
      pagination
      paginationMode="server"
      pageSize={query.perPage}
      onPageChange={onPageChange}
      page={query.page}
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={onSortChange}
      rowsPerPageOptions={[10, 50, 100]}
      onPageSizeChange={onPerPageChange}
      onRowSelected={onRowSelected}
    />
  );
};

export default withStyles(styles)(DataTableComponent);
