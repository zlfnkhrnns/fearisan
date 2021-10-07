import React,  { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactMarkdown from "react-markdown";
import Image from 'material-ui-image';
import AudioPlayer from 'material-ui-audio-player';

function toNormalCase(str) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export default function DetailDialog(props) {
  const detailKeys = Object.keys(props.detail).filter((x) => x !== "tableData");
  console.log(detailKeys);
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="detail-dialog-title"
        fullWidth
      >
        <DialogTitle id="detail-dialog-title" style={{ color: "#4C27D7" }}>
          Detail Sejarah
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {detailKeys.map((d) => (
              <Grid
                item
                xs={d === "indeks" || d === "rekaman" || d === "foto" ? 12 : 6}
                key={d}
              >
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  {d === "indeksId" ? "ID Sejarah" : toNormalCase(d + "")}
                </Typography>

                {d === "indeks" ? (
                  <ReactMarkdown
                    source={props.detail[d]}
                    renderers={{ paragraph: Typography }}
                    multiline={f === "indeks"}
                    minRows={4}
                  />
                ) : (
                  <Typography variant="body2">
                    {props.detail[d] + ""}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
