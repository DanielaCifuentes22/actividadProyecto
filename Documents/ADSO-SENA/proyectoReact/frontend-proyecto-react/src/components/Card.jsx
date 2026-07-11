function Card({titulo, descripcion}){
    return(
     <article className = "card">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>

         {botonTexto && (
                <button className="btn-card">
                    {botonTexto}
                </button>
            )}
            
      </article>
    );
}
export default Card;