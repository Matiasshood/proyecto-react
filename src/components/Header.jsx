import { Link, Navigate } from 'react-router-dom';
import NavBar from './NavBar'
import { useAuthContext } from './context/AuthContext';
import styles from "./styles/Header.module.css";
import { ShoppingBag } from 'lucide-react';
import { CarritoContext } from './context/CarritoContext';
import { useContext } from 'react';
import Logo from '../assets/LogoVulcane.png'

const Header = () => { 
    const {usuario, logout} = useAuthContext();
    const estaLogueado = !!usuario;
    const { carrito } = useContext(CarritoContext);
    const contadorEnCarrito = carrito.length;

    return (  

        
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.logo}>
                    <Link to="/">
        <img src={Logo} alt="Logo Vulcane" style={{ cursor: "pointer" }} />
      </Link>
                </div> 
            </div>
            <div className={styles.headerBottom}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarContainer}>
                <NavBar />
                </div>  
            <div className={styles.iconsContainer}>
                {estaLogueado ?
                
                <Link to="/" onClick={logout} className="navLink">
  Cerrar Sesión
</Link> :
                <Link to='/login'>
                    Ingresá
                </Link>
                }
                <Link to="/carrito" style ={{position: 'relative'}}>
                <ShoppingBag className={styles.icono} />
                {contadorEnCarrito >0 &&(
                    <span className={styles.contadorDeCarrito}>
                        {contadorEnCarrito}
                    </span>
                )}
                </Link>    
            </div>
            </div>
        </div>
        
        
        </header> 
        
    );  
}  
export default Header;