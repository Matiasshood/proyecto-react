import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const RutaProtegidaUsuario = ({ children }) => {
    const { usuario } = useAuthContext();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RutaProtegidaUsuario;