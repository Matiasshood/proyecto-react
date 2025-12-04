import { useState } from "react";
import styles from "./styles/FormProducto.module.css";

const FormProducto = ({onAgregar}) => {
    
    const [errores, setErrores] = useState ({});
    const [producto, setProducto] = useState ({
        nombre: '',
        precio: '',
        imagen: '',
        descripcion: ''
    });

    const handleChange = (evento)=> {
        const {name, value} = evento.target;
        setProducto({... producto, [name]: value});

    };

    const validarForm = () => {
        const nuevosErrores ={};

        if(!producto.nombre.trim())
            nuevosErrores.nombre ='El nombre es obligatorio.'

        if (!producto.precio || producto.precio <0)
            nuevosErrores.precio = 'El precio debe ser mayor a 0.'
        
        if(!producto.imagen.trim() || producto.imagen.length <6)
            nuevosErrores.imagen = 'Debes subir la URL de una imagen valida.';
        
        if(!producto.descripcion.trim() || producto.descripcion.length <10)
            nuevosErrores.descripcion = "La descripcion debe tener al menos 10 caracteres.";
        
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    const handleSubmit = (evento) => {
        evento.preventDefault();

        if (!validarForm())
            return;
        const productoAEnviar = {
            ...producto,
            precio: parseFloat(producto.precio)
        };
    

    onAgregar(productoAEnviar);
    
    setProducto({nombre: '', precio: '', imagen: '', descripcion: ''});
    setErrores({});
}
    return(
        <>
        <div className={styles.formProductoContainer}>
        <form onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <div>
                <label>Nombre:</label>
                <br/>
                <input
                type='text'
                name='nombre'
                value={producto.nombre}
                onChange={handleChange}
                />
                {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}
            </div>
            <div>
                <label>Precio:</label>
                <br/>
                <input
                type='number'
                name='precio'
                value={producto.precio}
                onChange={handleChange}
                min={0}
                step='any'
                />
                {errores.precio && <p style={{color: 'red'}}>{errores.precio}</p>}
            </div>
            <div>
                <label>URL de Imagen:</label>
                <br/>
                <input
                type='text'
                name='imagen'
                value={producto.imagen}
                onChange={handleChange}
                />
                {errores.imagen && <p style={{color: 'red'}}>{errores.imagen}</p>}
            </div>
            <div>
                <label>Descripcion:</label>
                <br/>
                <textarea
                    name='descripcion'
                    value={producto.descripcion}
                    onChange={handleChange}
                    />
                    {errores.descripcion && <p style={{color:'red'}}>{errores.descripcion}</p>}
            </div>
            <button type='submit'>Agregar Productos</button>
                
        </form>
        </div>
        </>
      

    );

}

export default FormProducto;