import style from '../styles/FormProducto.module.css';

const Contacto = () => {
    return (
        <div className={style.formProductoContainer}>
            <h2>Contacto y sugerencias</h2>
            <form style={{ display: "grid", gap: "12px" }} 
                  action="https://formspree.io/f/mjkwweoo" 
                  method="POST">

                <label>
                    Nombre:
                    <br />
                    <input type="text" name="Nombre" required />
                </label>

                <label>
                    Correo electrónico:
                    <br />
                    <input type="email" name="email" required />
                </label>

                <label>
                    Mensaje:
                    <br />
                    <textarea name="message" rows={4}></textarea>
                </label>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit">Enviar</button>
                </div>

            </form>
        </div>
    );
};

export default Contacto;
