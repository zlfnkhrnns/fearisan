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
import AudioPlayer from 'material-ui-audio-player';
import axios from "axios";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function toNormalCase(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
}

export default function FormDialog(props) {
  const [date, setDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [image, setImage] = useState({
    foto :[],
    preview:null
  });
  const [audio, setAudio] = useState({
    rekaman :[],
    preview:null
  });
  const [form, setForm] = useState({
    kategoriId: "",
    namaNarator: "",
    namaInterview: "",
    judulSejarah: "",
    tempatInterview: "",
    volume: "",
    copyright: "",
    download: "",
    indeks: ""
  });

  React.useEffect(() => {
    setForm({
      ...props.edit
    });
  }, [props.edit]);

  const form_name = Object.keys(form).filter(x => x !== "tableData");
  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    setForm((form) => ({ ...form, [e.target.name]: e.target.value,  }));
  };
  const handleImage = (e) => {
    setImage({
      ...image, foto: e.target.files[0], preview:URL.createObjectURL(e.target.files[0]),
    })
  }

  const handleAudio = (e) => {
    setAudio({
      ...audio, rekaman: e.target.files[0], preview:URL.createObjectURL(e.target.files[0]),
    })
  }
  const handleChangeDate = e => {
    setDate(e.target.value);
 };

  const onSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append('kategoriId', form.kategoriId);
    bodyFormData.append('namaNarator', form.namaNarator);
    bodyFormData.append('namaInterview', form.namaInterview);
    bodyFormData.append('judulSejarah', form.judulSejarah);
    bodyFormData.append('tempatInterview', form.tempatInterview);
    bodyFormData.append('tanggalInterview', date);
    bodyFormData.append('volume', form.volume);
    bodyFormData.append('copyright', form.copyright);
    bodyFormData.append('download', form.download);
    bodyFormData.append('indeks', form.indeks);
    bodyFormData.append('foto', image.foto);
    bodyFormData.append('rekaman', audio.rekaman);
    console.log('bodyForm', bodyFormData)
    axios({
      method: "put",
      url: "http://localhost:3001/List/"+form.idSejarah,
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
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="edit-dialog-title">
        <form onSubmit={(e) => onSubmit(e)}>
          <DialogTitle id="edit-dialog-title" style={{ color: '#4C27D7' }}>Edit List Sejarah</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {form_name.filter(x => x !== "kategori").map(f => {
                if (f === "kategoriId") {
                  return (
                    <Grid item xs={f === "indeks" ? 12 : 6} key={f}>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor={toNormalCase(f)}>
                          Kategori
                        </InputLabel>
                        <NativeSelect
                          id={toNormalCase(f)}
                          label={f === "idSejarah" ? "ID Sejarah" : toNormalCase(f)}
                          value={form[f]}
                          name={f}
                          onChange={(e) =>handleChange(e)}
                          className={classes.selectEmpty}>
                          {props.kategori.map(k => (
                            <option value={k.idKategori}>{k.nama}</option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                  )
                } else {
                  return (
                    <Grid item xs={f === "indeks" ? 12 : 6} key={f}>
                      <TextField
                        margin="dense"
                        id={toNormalCase(f)}
                        label={f === "idSejarah" ? "ID Sejarah" : toNormalCase(f)}
                        value={form[f]}
                        name={f}
                        onChange={(e) =>handleChange(e)}
                        fullWidth
                        required={f !== "download" || f !== "foto" || f !== "rekaman"}
                        multiline={f === "indeks"}
                        minRows={4}
                        disabled={f === "idSejarah"}
                      />
                    </Grid>
                  )
                }
              })}
            </Grid>
              <TextField
                name="tanggalInterview"
                id="tanggalInterview"
                label="Tanggal Interview"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => handleChangeDate(e)}
                //fullWidth
                required
              />
            <Grid item xs={12}>
              <Box width={1} p={1} m={-1} my={1}>
                <InputLabel>
                  Rekaman *
                </InputLabel>
              </Box>
              {audio.preview !== null ?
              <Box paddingLeft={2}>
                <AudioPlayer
                  Audio my={1}
                  elevation={1}
                  width="100%"
                  variation="default"
                  spacing={3}
                  download={true}
                  autoplay={false}
                  order="standart"
                  src={audio.preview}/>
              </Box> : null}
              <Box marginTop={3}>
                <Button
                  variant="contained"
                  component="label">
                  Pilih Rekaman
                  <input
                    accept="audio/*"
                    multiple
                    onChange={(e) => handleAudio(e)}
                    type="file"
                    name={'rekaman'}
                    hidden/>
                </Button>
              </Box>
              <Box p={1} m={-1}>
                <Box width={1} p={1} m={-1} my={1}>
                  <InputLabel>
                    Foto *
                  </InputLabel>
                </Box>
                {image.preview !== null ? <Image my={1}
                  src={image.preview}
                /> : null}
                <Button
                  variant="contained"
                  component="label">
                  Pilih Foto
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImage(e)}
                    name={'foto'}
                    hidden />
                </Button>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Batal
          </Button>
            <Button onClick={props.handleClose} type="submit" color="primary" variant="contained">
              Edit
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
