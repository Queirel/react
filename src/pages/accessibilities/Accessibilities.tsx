import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Accessibilities.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "icon",
    headerName: "Icon",
    width: 75,
    renderCell: (params) => {
      return <img src={params.row.icon || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Accessibility",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },
];

const Accessibility = () => {
  const [accessibility, setAccessibility] = useState([])

    useEffect(() => {
      axios.get('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/accessibility')
        .then((response) => {
          const data = response.data;
          setAccessibility(data);
        })
        .catch((error) => {
          console.error('Error al obtenerlo:', error);
        });
    }, []);

    return (
      <div className="accessibility">
        <div className="info">
          <h1>Accessibilities</h1>
          <Link to="/accessibilitynew">
          <button>Add New</button>
          </Link>        </div>
          <DataTable slug="accessibility" columns={columns} rows={accessibility} />
      </div>
    );
};

export default Accessibility;
