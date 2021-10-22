import React, { forwardRef } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import axios from "axios";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddDialog from "./add-dialog";
import EditDialog from "./edit-dialog";
import DetailDialog from "./detail-dialog";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox {...props} ref={ref} id="table-add" />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Sejarah() {
  const [state, setState] = React.useState({
    loading: true,
    columns: [
      { title: "ID Sejarah", field: "idSejarah" },
      { title: "Kategori", field: "kategori" },
      { title: "Judul Sejarah", field: "judulSejarah" },
      { title: "Nama Narator", field: "namaNarator" },
      { title: "Tempat Interview", field: "tempatInterview" },
      { title: "Tanggal Interview", field: "tanggalInterview", type: "date", },
      { title: "Rekaman", field: "rekaman", render: rowData => <audio controls> <source src={'http://localhost:3001/assets/rekaman/'+rowData.rekaman}/></audio> },
      { title: "Foto", field: "foto", render: rowData => <img src={'http://localhost:3001/assets/foto/'+rowData.foto}style={{height: 40}}/> },

    ],
    data: [],
  });
  const [kategori, setKategori] = React.useState([]);
  const [indeks, setIndeks] = React.useState([]);

  function fetchKategori() {
    axios
      .get("http://localhost:3001/Kategori")
      .then((res) => {
        console.log(res);
        setKategori(res.data.Kategori);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan, Reload aplikasi!");
      });
  }

  function fetchIndeks() {
    axios
      .get("http://localhost:3001/Indeks")
      .then((res) => {
        console.log(res);
        setIndeks(res.data.Indeks);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan, Reload aplikasi!");
      });
  }

  function fetchData() {
    setState({
      ...state,
      loading: true,
    });
    axios
      .get("http://localhost:3001/List")
      .then((res) => {
        let data = res.data.Sejarah;
        console.log("data", data);
        setState({
          ...state,
          data: data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan, Reload aplikasi!");
        setState({
          ...state,
          loading: false,
        });
      });
  }
  React.useEffect(() => {
    fetchData();
    fetchKategori();
    fetchIndeks();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [detail, setDetail] = React.useState({});
  const [edit, setEdit] = React.useState({});

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleDelete = (form) => {
    const confirmation = window.confirm(
      "Apakah kamu yakin ingin menghapus data ini?"
    );
    if (confirmation) {
      setState({
        ...state,
        loading: true,
      });
      axios
        .delete("http://localhost:3001/List/"+form.idSejarah)
        .then((res) => {
          console.log(res);
          fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Terjadi kesalahan, Reload aplikasi!");
          fetchData();
        });
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          color: "#4C27D7",
          display: "block",
          width: "100%",
          marginTop: 5,
        }}
      >
        List Sejarah
      </Typography>
      <br />
      <MaterialTable
        localization={{
          body: {
            editRow: {
              deleteText: "Apakah kamu yakin ingin menghapus data ini?",
            },
          },
        }}
        actions={[
          {
            icon: () => <VisibilityIcon />,
            tooltip: "Detail",
            onClick: (event, rowData) => {
              // Do save operation
              console.log(
                {kategoriId: rowData.kategoriId,
                idSejarah: rowData.idSejarah,
                namaNarator: rowData.namaNarator,
                namaInterview: rowData.namaInterview,
                judulSejarah: rowData.judulSejarah,
                tempatInterview: rowData.tempatInterview,
                tanggalInterview: rowData.tanggalInterview,
                rekaman: <audio controls> <source src={'http://localhost:3001/assets/rekaman/'+rowData.rekaman}/></audio>,
                volume: rowData.volume,
                copyright: rowData.copiright,
                foto: <img src={'http://localhost:3001/assets/foto/'+rowData.foto}style={{height: 40}}/>,
                download: rowData.download,
                indeks: rowData.indeks})
              setDetail({kategoriId: rowData.kategoriId,
                idSejarah: rowData.idSejarah,
                namaNarator: rowData.namaNarator,
                namaInterview: rowData.namaInterview,
                judulSejarah: rowData.judulSejarah,
                tempatInterview: rowData.tempatInterview,
                tanggalInterview: rowData.tanggalInterview,
                rekaman: 'http://localhost:3001/assets/rekaman/'+rowData.rekaman,
                volume: rowData.volume,
                copyright: rowData.copiright,
                foto: 'http://localhost:3001/assets/foto/'+rowData.foto,
                download: rowData.download,
                indeks: rowData.indeks});
              handleClickOpen2();
            },
          },
          {
            icon: () => <Edit />,
            tooltip: "Edit",
            onClick: (event, rowData) => {
              // Do save operation
              console.log(rowData);
              setEdit(rowData);
              handleClickOpen3();
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete",
            onClick: (event, rowData) => {
              // Do save operation
              console.log(rowData);
              handleDelete(rowData);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        isLoading={state.loading}
        icons={tableIcons}
        style={{ width: "100%" }}
        title={
          <>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
              style={{
                fontWeight: "bold",
                textTransform: "none",
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              Tambah
            </Button>
          </>
        }
        columns={state.columns}
        data={state.data}
      />
      <DetailDialog open={open2} handleClose={handleClose2} detail={detail} />
      <AddDialog
        kategori={kategori}
        open={open}
        handleClose={handleClose}
      />
      <EditDialog
        kategori={kategori}
        open={open3}
        handleClose={handleClose3}
        edit={edit}
      />
    </>
  );
}
