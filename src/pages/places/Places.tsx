/** @format */

import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./places.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// async function obtenerNombreTablaRelacionada(id: any): Promise<any> {
//   const response = await fetch(`${import.meta.env.VITE_URL}/users/${id}`);
//   const data = await response.json();
//   return data.nombre;
// }

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
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
  // {
  //   field: "placeid",
  //   type: "string",
  //   headerName: "Place Id",
  //   width: 150,
    
  // },
  {
    field: "placemapid",
    type: "string",
    headerName: "Place Map Id",
    width: 150,

    
  },
  {
    field: "categoryid",
    type: "string",
    headerName: "Category Id",
    width: 150,
    
  },
];

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/places`)
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
