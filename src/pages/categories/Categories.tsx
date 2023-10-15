/** @format */

import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Categories.scss";
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
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/categories")
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
      });
  }, []);

  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <Link to="/categorynew">
          <button>Add New</button>
          </Link>
      </div>
      <DataTable slug="categories" columns={columns} rows={categories} />
    </div>
  );
};

export default Categories;
