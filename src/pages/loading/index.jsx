import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  text: {
    color: "#AAA",
    textAlign: "center",
    display: "block",
    marginTop: theme.spacing(2),
  },
}));

export default function Loading() {
  const c = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={c.container}
    >
      <div>
        <Grid item container justify="center" alignItems="center">
          <CircularProgress />
        </Grid>
        <Typography variant="subtitle1" className={c.text}>
          Tunggu sebentar...
        </Typography>
      </div>
    </Grid>
  );
}
