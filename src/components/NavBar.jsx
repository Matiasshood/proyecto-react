import { Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import styles from "./styles/NavBar.module.css";
import { FaInstagram } from "react-icons/fa";

const NavBar = () => {  

    const {usuario} = useAuthContext();
    const esAdmin = usuario == 'admin';

    return (  
        <nav className={styles.navBar}>  
            <ul>    
                <li><Link to={'/about'}>Quienes somos</Link></li>  
                <li><Link to={'/contacto'}>Contacto</Link></li>
                {esAdmin &&
                <li><Link to={'/admin'}>Admin</Link></li>}
                <li><Link to={'/carrito'}>Carrito</Link></li> 
                <li><Link to={'https://www.instagram.com/vulcane.store/'}target="_blank" rel="noopener noreferrer">
    <FaInstagram style={{ marginRight: 6 }} />Instagram</Link></li>   
            </ul>  
        </nav>  
    );  
}  


export default NavBar; 