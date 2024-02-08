/** @format */

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
// import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import PaginationDataTable from "../../components/paginationDataTable/PaginationDataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "image",
    headerName: "Image",
    width: 75,
    renderCell: (params) => {
      return <img src={params.row.image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstname",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Lastname",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  // {
  //   field: "verified",
  //   headerName: "Verified",
  //   width: 100,
  //   type: "boolean",
  // },
];



const handleDelete = (id: number) => {
  axios
    .delete(`${import.meta.env.VITE_URL}/users/${id}`)
    .then((response) => {
      console.log("Eliminado con éxito:", response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar:", error);
    });
};

const actionColumn: GridColDef = {
  field: "action",
  headerName: "Action",
  width: 100,
  renderCell: (params) => {
    return (
      <div className="action">
        <Link to={`/users/${params.row.id}`}>
          {false ? (
            <img src="/view.png" alt="Edit" />
          ) : (
            <img src="/view.svg" alt="Edit" />
          )}{" "}
        </Link>
        <Link to={`/users`}>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </Link>
      </div>
    );
  },
};

const Users = () => {

  const [rowsCount, setRowsCount] = useState();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/users`
      )
      .then((response) => {
        const data = response.data;
        setRowsCount(data.length);
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
        // setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
      });
  }, []);


// const rowCount = rowsCount
//   const [rowCountState, setRowCountState] = useState(rowCount);
// useEffect(() => {
//   setRowCountState((prevRowCountState) =>
//     rowCount !== undefined ? rowCount : prevRowCountState,
//   );
// }, [rowCount, setRowCountState])


  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  // const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  // const [pageState, setPageState] = useState({
  //   isLoading: false,
  //   data: [users],
  //   total: 5,
  //   page: 1,
  //   pageSize: 20,
  // });

  useEffect(() => {
    const offset = paginationModel.page*paginationModel.pageSize
    axios
      .get(
        `${import.meta.env.VITE_URL}/users?offset=${offset}&limit=${
          paginationModel.pageSize
        }`
      )
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
        // setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
      });
  }, [paginationModel]);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <Link to="/usernew">
          <button>Add New</button>
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        autoHeight
        rows={users}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowsCount}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            // quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        disableVirtualization
      />
    </div>
  );
};

export default Users;
