import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./places.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    width: 150,
  },
  {
    field: "latitude",
    type: "string",
    headerName: "Latitude",
    width: 150,
  },
  {
    field: "longitude",
    type: "string",
    headerName: "Longitude",
    width: 150,
  },
];

const Places = () => {
  const [places, setPlaces] = useState([])

    useEffect(() => {
      axios
        .get("http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/places")
        .then((response) => {
          const data = response.data;
          setPlaces(data);
        })
        .catch((error) => {
          console.error("Error al obtenerlo:", error);
        });
    }, []);

    return (
      <div className="places">
        <div className="info">
          <h1>Places</h1>
          <Link to="/placesnew">
          <button>Add New</button>
          </Link>
        </div>
          <DataTable slug="places" columns={columns} rows={places} />
      </div>
    );
};

export default Places;
