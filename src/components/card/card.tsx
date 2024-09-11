import "./card.css"

interface CardProps{
    price: number,
    title: string,
    image: string,
    onEdit: () => void;  
    onDelete: () => void; 

}


export function Card({price, image, title, onEdit, onDelete} : CardProps){
    return(
        <div className="card">
           <img src={image}/>
           <p>{title} <strong> - R$ {price}</strong></p>
           <div className="button-container">
                <button onClick={onEdit} className="btn btn-edit">Editar</button>
                <button onClick={onDelete} className="btn btn-delete">Excluir</button>
            </div>
        </div>
    )
}