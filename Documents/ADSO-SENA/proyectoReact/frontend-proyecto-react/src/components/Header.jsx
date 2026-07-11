import IdiomaMenu from './IdiomaMenu';

function Header(){
    return(
        <header className = "header">
            <div className = "logo">
                <img src=".img/logogaleria.png" alt="logotipo" />
                <img src="img/ubicacion.png" alt="ubicación" />
            </div>
             <IdiomaMenu />
            <nav>
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