import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import axios from "axios";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
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
import AddIcon from "@material-ui/icons/Add";

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

export default function Audio() {
  const [state, setState] = React.useState({
    loading: true,
    columns: [
      { title: "ID Sejarah", field: "idIndeks" },
      { title: "Topik", field: "topik" },
      { title: "Menit", field: "menit" },
    ],
    data: [],
  });
  function fetchData() {
    setState({
      ...state,
      loading: true,
    });
    axios
      .get("http://localhost:5000/indeks")
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          data: res.data.semuaIndeks,
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
    document.querySelector("#table-add").style.display = "none";
  }, []);

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
        .delete("http://localhost:5000/indeks", form)
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
        Indeks Audio
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
        icons={tableIcons}
        style={{ width: "100%" }}
        title={
          <>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              style={{
                fontWeight: "bold",
                textTransform: "none",
                marginTop: 15,
                marginBottom: 5,
              }}
              onClick={() =>
                document.querySelector("#table-add").parentNode.click()
              }
            >
              Tambah
            </Button>
          </>
        }
        columns={state.columns}
        data={state.data}
        isLoading={state.loading}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              axios
                .post("http://localhost:5000/indeks", newData)
                .then((res) => {
                  console.log(res);
                  fetchData();
                  resolve();
                })
                .catch((err) => {
                  console.log(err);
                  alert("Terjadi kesalahan, Reload aplikasi!");
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              console.log(newData, oldData);
              axios
                .put("http://localhost:5000/indeks", newData)
                .then((res) => {
                  console.log(res);
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                    fetchData();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("Terjadi kesalahan, Reload aplikasi!");
                });
            }),
        }}
      />
    </>
  );
}
