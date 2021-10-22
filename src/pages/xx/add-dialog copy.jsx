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
  const [image, setImage] = useState('');
  const { form, handleChange } = useForm({
    nama: "",
    gambar: image
  });
   
  const form_name = Object.keys(form);
  const classes = useStyles();

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'audio';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      if (name == 'images') {
        setImage(e.target.result)
      }
    };
  };

  return (
    <div>
      <Dialog 
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
        <form
          onSubmit={(e) => {
            console.log(form);
            props.handleSubmit(e, form);
          }}>
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
                          value={form[f]}
                          name={f}
                          onChange={handleChange}
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
                {image ? <Image my={1}
                  src={image}
                /> : null}
                <Button
                  variant="contained"
                  component="label">
                  Pilih Gambar
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleCapture}
                    name={'gambar'}
                    hidden />
                </Button>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Batal
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Tambah
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}