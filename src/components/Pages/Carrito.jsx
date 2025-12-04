import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import styles from "../styles/Carrito.module.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const productosAgrupados = carrito.reduce((acc, producto) => {
    const existe = acc.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  const total = productosAgrupados.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  return (
    <div className={styles.carritoContainer}>
      <div className={styles.productosContainer}>
        {productosAgrupados.length === 0 ? (
          <div className={styles.carritoVacioContainer}>
            <span className={styles.carritoVacio}>El carrito esta vacio</span>
            </div>
        ) : (
          productosAgrupados.map((producto, indice) => (
            <div key={indice} className={styles.card}>
              <div className={styles.cardImgContainer}>
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <p>{producto.nombre}</p>
              <p>${producto.precio}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
      <div className={styles.resumenContainer}>
        <h2>Resumen del carrito</h2>
        <p>Productos: {carrito.length}</p>
        <p>Total: ${total.toFixed(2)}</p>


        <button onClick={vaciarCarrito} className={styles.resumenButton}>
          Vaciar carrito
        </button>
        <button onClick={() => {}} className={styles.resumenButton}>
          Comprar carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;
