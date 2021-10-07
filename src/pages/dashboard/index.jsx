import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
  },
  content: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  info: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 25,
    background: "rgba(76, 39, 215, 0.2)",
    color: "rgba(76, 39, 215, 1)",
    margin: theme.spacing(4),
    borderRadius: 15,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    audio: "?",
    sejarah: "?",
    kategori: "?",
  });
  function fetchData() {
    axios
      .get("http://localhost:5000/kategori")
      .then((res) => {
        console.log(res);
        axios
          .get("http://localhost:5000/indeks")
          .then((res2) => {
            console.log(res2);
            axios
              .get("http://localhost:5000/lis")
              .then((res3) => {
                console.log(res3);
                setState({
                  ...state,
                  audio: res2.data.semuaIndeks.length,
                  kategori: res.data.semuaKategori.length,
                  sejarah: res3.data.semuaSejarah.length,
                });
              })
              .catch((err) => {
                console.log(err);
                alert("Terjadi kesalahan, Reload aplikasi!");
              });
          })
          .catch((err) => {
            console.log(err);
            alert("Terjadi kesalahan, Reload aplikasi!");
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan, Reload aplikasi!");
      });
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.container}>
      <div style={{ width: "80%" }}>
        <Typography color="primary" variant="h2" className={classes.title}>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="subtitle1" className={classes.content}>
          Sejarah merupakan suatu sistem yang meneliti suatu kejadian sejak awal
          dan tersusun dalam bentuk kronologi. Sejarah adalah peristiwa masa
          lalu yang mempunyai catatan, rekod-rekod atau bukti-bukti yang
          konkrit.
          <br />
          (Aristoteles, 384 SM - 322 SM)
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <Typography color="primary" variant="h2" className={classes.info}>
              {state.kategori}{" "}
              <Typography color="primary" variant="body2">
                Kategori
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="primary" variant="h2" className={classes.info}>
              {state.audio}{" "}
              <Typography color="primary" variant="body2">
                Indeks
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="primary" variant="h2" className={classes.info}>
              {state.sejarah}{" "}
              <Typography color="primary" variant="body2">
                Sejarah
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
