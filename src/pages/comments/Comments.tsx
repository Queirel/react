  import { GridColDef } from "@mui/x-data-grid";
  import DataTable from "../../components/dataTable/DataTable";
  import "./comments.scss";
  import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    // {
    //   field: "image",
    //   headerName: "Icon",
    //   width: 75,
    //   renderCell: (params) => {
    //     return <img src={params.row.icon || "/noavatar.png"} alt="" />;
    //   },
    // },
    {
      field: "user_id",
      type: "string",
      headerName: "User",
      width: 100,
    },
    {
      field: "place_id",
      type: "string",
      headerName: "Place",
      width: 100,
    },
    {
      field: "comment",
      type: "string",
      headerName: "Comments",
      width: 150,
    },
    
    {
      field: "rate",
      type: "string",
      headerName: "Rate",
      width: 100,
    },

  ];

  const Comments = () => {
    const [comments, setComments] = useState([])

      useEffect(() => {
        axios
          .get(`${import.meta.env.VITE_URL}/comments`)
          .then((response) => {
            const data = response.data;
            setComments(data);
          })
          .catch((error) => {
            console.error("Error al obtenerlo:", error);
          });
      }, []);

      return (
        <div className="comments">
          <div className="info">
            <h1>Comments</h1>
            {/* <Link to="/commentnew">
          <button>Add New</button>
          </Link> */}
          </div>
            <DataTable slug="comments" columns={columns} rows={comments} />
        </div>
      );
  };

  export default Comments;
