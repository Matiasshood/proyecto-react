import { useState, useEffect, use} from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProductoDetalle.module.css';


const ProductoDetalle = () =>{
    const {id} =useParams();
    const [product, setProduct] = useState(null);

    useEffect(() =>{
        fetch(`https://68f968f5ef8b2e621e7bfe50.mockapi.io/productos/${id}`)
        .then(respuesta => respuesta.json())
        .then(dato => setProduct(dato));

    },[id]);
    
    if(!product)
        return <p>Cargando......</p>

    return(
        <div className={styles.detalleContainer}>
        <h2>{product.nombre} | ITEM #{product.id}</h2>
        <img src={product.imagen} alt={product.nombre}  
        width={500}
        height={500}/>
        
        <p>{product.descripcion}</p>
        </div>
    )
}

export default ProductoDetalle;