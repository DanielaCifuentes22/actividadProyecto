import { useState } from "react";
import foto1 from "../img/foto1.jpeg";
import foto2 from "../img/foto2.jpg";
import foto3 from "../img/foto3.jpg";
import foto4 from "../img/foto4.jpg";
import foto5 from "../img/foto5.jpg";
import foto6 from "../img/foto6.jpg";
import foto7 from "../img/foto7.jpeg";

function Hero(){
    const imagenes = [foto1, foto2, foto3, foto4, foto5, foto6, foto7];

    const [indice, setIndice] = useState(0);

    const siguiente = () => {
        setIndice((indice + 1) % imagenes.length);
    };

    const anterior = () => {
        setIndice((indice - 1 + imagenes.length) % imagenes.length);
    };
    return(
        <section className = "hero" id = "inicio">
            <div className = "hero-content">
                <div className="hero-texto">
                    <h1>GALERIA VIRTUAL CUECHA</h1>
                    <p>Soy pintura y dibujante. Mi trabajo explora la delicadeza de la acuarela
                        y la profundidad del grafito y el carboncillo para construir imágenes
                        en las que la memoria, la magia y la espiritualidad se entrelazan.
                    </p>
                </div>
                <div className="hero-slider">

                    <button onClick={anterior}>❮</button>

                    <img
                    src={imagenes[indice]}
                    alt="fotos sobre la galeria"
                    />

                    <button onClick={siguiente}>❯</button>
                </div>     
            </div>
        </section>
    );
}
export default Hero;