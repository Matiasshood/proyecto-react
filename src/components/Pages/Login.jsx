import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import style from '../styles/FormProducto.module.css';

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    login(usuario);
    if (usuario === "admin" && contrasenia === "1234") {
      navigate("/admin");
    } else {
      navigate("/carrito");
    }
  };

  return (
    <div className={style.formProductoContainer}>
      <form onSubmit={manejarSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{ textAlign: "center", color: "white" }}>Iniciar Sesion</h3>
        <label style={{ color: "white" }}>Usuario</label>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <label style={{ color: "white" }}>Contraseña</label>
        <input type="text" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
        <button type="submit" style={{ padding: "10px", borderRadius: "8px", cursor: "pointer" }}>Iniciar Sesion</button>
      </form>
    </div>
  );
};

export default Login;
