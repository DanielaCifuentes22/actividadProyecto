import Card from './Card';

function InfoSection(){
    return(
        <section className = "section" id = "informacion importante">
            <h2>Información de interés</h2>
            <div className = "cards-container">
                <Card
                titulo = "Objetivo de la galería"
                descripcion = "Concebir el arte como un espacio de contemplación y transformación,
                donde cada obra invita a descubrir nuevos significados."
                />
                <Card
                titulo = "Información general"
                descripcion = "Dirección de la galería: Carrera 30 # 50-69 Bello horizonte Pereira
                Teléfono: 6063500000
                Correo: galeriacuecha@gmail.com
                Horarios de atención: Lunes a viernes 8:00 am - 12:00 m y de 2:00 pm - 4:00 pm"
                />
                <Card 
                titulo = "Servicios"
                descripcion = "Se ofrece talleres de pintura y dibujo.
                 clases personalizadas en modalidad presencial o virtual.
                 Se abren cupos con previa inscripción y pago del 50 % del servicio."
                 botonTexto = "Inscribirse"
                />
            </div>
        </section>
    );
}
export default InfoSection;