import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "./context/CarritoContext";
import styles from "./styles/Productos.module.css";

const Productos = () => {
  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch("https://68f968f5ef8b2e621e7bfe50.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProducto(datos);
        setCargando(false);
      })
      .catch((error) => {
        setError("Error al cargar los productos");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Estamos cargando sus productos</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='mainContent'>
      <h2>Productos</h2>
      <div className={styles.gridContainer}>
        {producto.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.cardImgContainer}>
            <img
                src={product.imagen}
                alt={product.title}
                className={styles.cardImg}
            />
            </div>
            <h3 className={styles.cardTitle}>{product.nombre}</h3>
            <p className={styles.cardPrice}>$ {product.precio}</p>
            <div className={styles.cardButtons}>
              <button
                className={styles.cardButton}
                onClick={() => agregarAlCarrito(product)}>Agregar</button>
              <Link
                className={styles.cardButton}
                to={`/productos/${product.id}`}
              >Descripcion</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;