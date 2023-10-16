  import { GridColDef } from "@mui/x-data-grid";
  import DataTable from "../../components/dataTable/DataTable";
  import "./recommended.scss";
  import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "image",
      headerName: "Icon",
      width: 75,
      renderCell: (params) => {
        return <img src={params.row.image || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "name",
      type: "string",
      headerName: "Recommended",
      width: 150,
    },
  ];

  const Recommended = () => {
    const [recommended, setRecommended] = useState([])

      useEffect(() => {
        axios.get('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/recommended')
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
