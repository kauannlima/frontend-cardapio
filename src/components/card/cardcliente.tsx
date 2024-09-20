import "./card.css"

interface CardProps{
    price: number,
    title: string,
    image: string,
}
///22
export function CardCliente({price, image, title} : CardProps){
    
    return(
        <div className="card">
           <img src={image}/>
           <p>{title} <strong> - R$ {price}</strong></p>
        </div>
    )
}