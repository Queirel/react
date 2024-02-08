  import { GridColDef } from "@mui/x-data-grid";
  import DataTable from "../../components/dataTable/DataTable";
  import "./recommended.scss";
  import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "placeid",
      type: "string",
      headerName: "Place Id",
      width: 300,
    },
  ];

  const Recommended = () => {
    const [recommended, setRecommended] = useState([])

      useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/recommended`)
          .then((response) => {
            const data = response.data;
            setRecommended(data);
          })
          .catch((error) => {
            console.error('Error al obtenerlo:', error);
          });
      }, []);

      return (
        <div className="recommended">
          <div className="info">
            <h1>Recommended</h1>
            <Link to="/recommendednew">
          <button>Add New</button>
          </Link>
          </div>
            <DataTable slug="recommended" columns={columns} rows={recommended} />
        </div>
      );
  };

  export default Recommended;
