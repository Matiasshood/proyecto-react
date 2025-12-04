import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito((prev) => {
      const indice = prev.findIndex((p) => p.id === idProducto);
      if (indice === -1) return prev;
      const nuevo = [...prev];
      nuevo.splice(indice, 1);
      return nuevo;
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}