import React,  { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useForm from 'hooks/useForm';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import AudioPlayer from 'material-ui-audio-player';
import Image from 'material-ui-image';

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
  const { form, handleChange, setForm } = useForm({
    kategoriId: '',
    indeksId: '',
    namaNarator: '',
    namaInterview: '',
    judulSejarah: '',
    tempatInterview: '',
    tanggalInterview: '',
    rekaman: '',
    volume: '',
    copyright: '',
    foto: '',
    download: '',
    indeks: '',
  });

  React.useEffect(() => {
    setForm({
      ...props.detail
    });
  }, [props.detail]);

  const form_name = Object.keys(form).filter(x => x !== "tableData");
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState('');

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'audio';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      if (name == 'images') {
        setImage(e.target.result)
      } else {
        setAudio(e.target.result)
      }
    };
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="edit-dialog-title">
        <form onSubmit={(e) => props.handleSubmit(e, form)}>
          <DialogTitle id="edit-dialog-title" style={{ color: '#4C27D7' }}>Edit List Sejarah</DialogTitle>
          <DialogContent>
            {/* {JSON.stringify(detail)} */}
            {/* {JSON.stringify(form)} */}
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
                          label={f === "indeksId" ? "ID Sejarah" : toNormalCase(f)}
                          value={form[f]}
                          name={f}
                          onChange={handleChange}
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
                        label={f === "indeksId" ? "ID Sejarah" : toNormalCase(f)}
                        value={form[f]}
                        name={f}
                        onChange={handleChange}
                        fullWidth
                        required={f !== "download"}
                        multiline={f === "indeks"}
                        minRows={4}
                        disabled={f === "indeksId"}
                      />
                    </Grid>
                  )
                }
              })}
            </Grid>
            <Grid item xs={12}>
              <Box width={1} p={1} m={-1} my={1}>
                <InputLabel>
                  Rekaman *
                </InputLabel>
              </Box>
              {audio ?
              <Box paddingLeft={2}>
                <AudioPlayer
                  elevation={1}
                  width="100%"
                  variation="default"
                  spacing={3}
                  download={true}
                  autoplay={false}
                  order="standart"
                  src={audio}
                />
              </Box> : null}
              <Box marginTop={3}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Pilih Rekaman
                  <input
                    accept="audio/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    onChange={handleCapture}
                    type="file"
                    hidden />
                </Button>
              </Box>

              <Box p={1} m={-1}>
                <Box width={1} p={1} m={-1} my={1}>
                  <InputLabel>
                    Foto *
                  </InputLabel>
                </Box>
                {image ? <Image my={1}
                  src={image}
                /> : null}
                <Button
                  variant="contained"
                  component="label"
                >
                  Pilih Gambar
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleCapture}
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
            <Button type="submit" color="primary" variant="contained">
              Edit
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
