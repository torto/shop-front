import React, { Fragment } from "react";

import {
  Snackbar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

interface ErrorProps{ 
    error: string | null;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <Fragment>
      {!!error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={!!error}
          autoHideDuration={6000}
        >
          <Alert severity="error">
            <AlertTitle>
              <strong>Request Error</strong>
            </AlertTitle>
            <strong>Message: </strong>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

export default Error;
