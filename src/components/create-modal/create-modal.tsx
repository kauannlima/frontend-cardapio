import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css"

interface InputProps{
    label: string,
    value: string | number,
    updateValue(value: any) : void
}

interface ModalProps{
    closeModal(): void
}
const Input = ({ label, value, updateValue } : InputProps) => {
    return(
        <>
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}


export function CreateModal({closeModal}: ModalProps){
    const[title, setTitle] = useState("");
    const[price, setPrice] = useState(0);
    const[image, setImage] = useState("");
    const {mutate, isSuccess} = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close"></button>
                <h2>Cadastre um novo item</h2>
                <form className="input-container">
                    <Input label="Título do item" value={title} updateValue={setTitle} />
                    <Input label="Preço do item" value={price} updateValue={setPrice} />
                    <Input label="Link da imagem do item" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">Incluir</button>
            </div>
        </div>
    )
}    