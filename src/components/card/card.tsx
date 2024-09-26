import "./card.css"

interface CardProps{
    price: number,
    title: string,
    image: string,
    onEdit: () => void;  
    onDelete: () => void; 
    showDeleteButton: () => boolean; 
    showEditButton: () => boolean; 

}
///22
export function Card({price, image, title, onEdit, onDelete, showDeleteButton, showEditButton} : CardProps){
    
    return(
        <div className="card">
           <img src={image}/>
           
           <p>{title} <strong> - R$ {price}</strong></p>
           <div className="button-container">
                 {showEditButton() &&<button onClick={onEdit} className="btn btn-edit">Editar</button>}
                {showDeleteButton() && <button className="btn btn-delete" onClick={onDelete}>Deletar</button>}
            </div>
        </div>
    )
}