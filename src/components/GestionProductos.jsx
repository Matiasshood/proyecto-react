import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import EditarProducto from "./EditarProducto";
import styles from './styles/GestionProductos.module.css';
import { Link } from "react-router-dom";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const API = "https://68f968f5ef8b2e621e7bfe50.mockapi.io/productos";

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });
      if (!respuesta.ok) throw new Error("Error al agregar el producto.");
      const datos = await respuesta.json();
      setProductos([...productos, datos]);
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al agregar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (!confirmar) return;
    try {
      const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error("Error al eliminar");
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  const actualizarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${API}/${productoActualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado)
      });
      if (!respuesta.ok) throw new Error("Error al actualizar el producto.");
      const datos = await respuesta.json();
      setProductos(prev => prev.map(p => (p.id === datos.id ? datos : p)));
      setProductoSeleccionado(null);
      alert("Producto actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al actualizar el producto.");
    }
  };

  if (cargando) return <div>Cargando productos...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormProducto onAgregar={agregarProducto} />
      </div>

      <div className={styles.panel}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.productoItem}>
            <Link to={`/productos/${producto.id}`}>
              <img className={styles.imagen} src={producto.imagen} alt={producto.nombre} />
            </Link>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10 }}>
              <button onClick={() => seleccionarProducto(producto)}>Editar</button>
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className={styles.formContainer}>
          <EditarProducto
            productoSeleccionado={productoSeleccionado}
            onActualizar={actualizarProducto}
            onCancelar={() => setProductoSeleccionado(null)}
          />
        </div>
      )}
    </div>
  );
};

export default GestionProductos;
