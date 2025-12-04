import { useEffect, useState } from "react";
import style from './styles/FormProducto.module.css';

const EditarProducto = ({ productoSeleccionado, onActualizar, onCancelar }) => {
    
    const [producto, setProducto] = useState(productoSeleccionado || {
        nombre: '',
        precio: '',
        imagen: '',
        descripcion: ''
    });

    const API = "https://68f968f5ef8b2e621e7bfe50.mockapi.io/productos";

    useEffect(() => {
        if (productoSeleccionado)
            setProducto(productoSeleccionado);
    }, [productoSeleccionado]);

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
            const respuesta = await fetch(`${API}/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error("Error al actualizar el producto");

            const datos = await respuesta.json();
            onActualizar(datos);
        } catch (error) {
            console.error(error.message);
            alert("Hubo un error al actualizar el producto.");
        }
    };

    return (
        <div className={style.formProductoContainer}>
        <form onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>

            <div>
                <label>Nombre:</label>
                <br />
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Precio:</label>
                <br />
                <input
                    type='number'
                    name='precio'
                    value={producto.precio || ''}
                    onChange={handleChange}
                    required
                    min='0'
                    step='any'
                />
            </div>

            <div>
                <label>URL de Imagen:</label>
                <br />
                <input
                    type='text'
                    name='imagen'
                    value={producto.imagen}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Descripción:</label>
                <br />
                <textarea
                    name="descripcion"
                    value={producto.descripcion || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "15px"
            }}>
                <button type="submit">Confirmar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
        </div>
    );
}

export default EditarProducto;
