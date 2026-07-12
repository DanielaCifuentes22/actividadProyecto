import IdiomaMenu from './IdiomaMenu';
import logogaleria from "../img/logogaleria.png";
import ubicacion from "../img/ubicacion.png";

function Header(){
    return(
        <header className = "header">
            <div className = "logo">
                <img src={logogaleria} alt="logo de la galeria"/>
                <img src={ubicacion} alt="ubicación"/>
            </div>
             <IdiomaMenu />
            <nav className = "nav">
                <a href="#inicio">INICIO</a>
                <a href="#obras">OBRAS</a>
                <a href="exposiciones">EXPOSICIONES</a>
                <a href="tienda">TIENDA</a>
                <a href="sobre mí">SOBRE MI</a>
                <a href="talleres">TALLERES</a>
                <a href="contacto">CONTACTO</a>
            </nav>
        </header>
    );
}
export default Header;