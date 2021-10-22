import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useForm from "hooks/useForm";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function toNormalCase(str) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export default function FormDialog(props)  {
  const [image, setImage] = useState({
    gambar :[],
    preview:null
  });

  const [form, setForm] = useState({
    nama: ""
  })
  const handleChange = (e) => {
    e.persist();
    setForm((form) => ({ ...form, [e.target.name]: e.target.value,  }));
  };
   
  const form_name = Object.keys(form);
  const classes = useStyles();

  const handleImage = (e) => {
    setImage({
      ...image, gambar: e.target.files[0], preview:URL.createObjectURL(e.target.files[0]),
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append('nama', form.nama);
    bodyFormData.append('gambar', image.gambar);
    console.log('bodyForm', bodyFormData)
    axios({
      method: "post",
      url: "http://localhost:3001/Kategori/",
      data: bodyFormData,
      headers:{"Content-Type":"multipart/form-data"},
    })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan, Reload aplikasi!");
      });
  }

  return (
    <div>
      <Dialog 
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
        <form
          onSubmit={(e) => onSubmit(e)}>
          <DialogTitle id="form-dialog-title" style={{ color: "#4C27D7" }}>
            Tambah Kategori
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {form_name
                .filter((x) => x !== "gambar")
                .map((f) => {               
                    return (
                      <Grid item xs={24} key={f}>
                        <TextField
                          margin="dense"
                          id={toNormalCase(f)}
                          label={
                            f === "idKategori" ? "ID Kategori" : toNormalCase(f)
                          }
                          name={f}
                          onChange={(e) =>handleChange(e)}
                          fullWidth
                          required/>
                      </Grid>
                    );
                })}
            </Grid>
            <Grid item xs={12}>
              <Box p={1} m={-1}>
                <Box width={1} p={1} m={-1} my={1}>
                  <InputLabel>
                    Gambar *
                  </InputLabel>
                </Box>
                {image.preview !== null ? <Image my={1}
                  src={image.preview}
                /> : null}
                <Button
                  variant="contained"
                  component="label">
                  Pilih Gambar
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImage(e)}
                    name={'gambar'}
                    hidden 
                    required/>
                </Button>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Batal
            </Button>
            <Button onClick={props.handleClose} type="submit" color="primary" variant="contained">
              Tambah
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}