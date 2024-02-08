import { Link } from "react-router-dom";

function App() {
  // Función para cerrar sesión
  const logout = () => {
    // Lógica de cierre de sesión (puede incluir la solicitud al servidor para invalidar el token, etc.)

    // Eliminar el token del localStorage
    localStorage.removeItem('token'); // Reemplaza 'miToken' con el nombre real de tu token
    window.location.reload()
  };

  return (
    <div>
      <h1>Profile</h1>
      {/* Otros componentes y contenido de tu aplicación */}
      <div className="form">
      <Link to="/">
      <button className="custom-button btn btn-block btn-danger cursor" onClick={logout}>Log out</button>
     </Link>
     </div>
    </div>
  );
}

export default App;
