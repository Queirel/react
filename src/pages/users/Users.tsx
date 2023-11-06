import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
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
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  // const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/users`)
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error al obtenerlo:', error);
      });
  }, []);

    return (
      <div className="users">
        <div className="info">
          <h1>Users</h1>
          <Link to="/usernew">
          <button>Add New</button>
          </Link>
        </div>
          <DataTable slug="users" columns={columns} rows={users} />
        {/* {open && <Add slug="users" columns={columns} setOpen={setOpen} />} */}
      </div>
    );
};

export default Users;
