import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css"

interface InputProps{
    label: string;
    value: string | number;
    updateValue(value: any) : void;
    maxLength?: number;
}

interface ModalProps{
    closeModal(): void
}
const Input = ({ label, value, updateValue, maxLength } : InputProps) => {

    const currentLength = typeof value === "string" ? value.length : 0;
    const remainingChars = maxLength ? maxLength - currentLength : 0;

    return(
        <>
        <label>{label}</label>
        <input 
        value={value} 
        onChange={event => updateValue(event.target.value)}
        maxLength={maxLength}
        />  
        {/*Código da Internet*/}
         {maxLength !== undefined && (
                <p className="remainingChars">{remainingChars} caracteres restantes</p>
            )}   
        </>
    )
}

export function CreateModal({closeModal}: ModalProps){
    const[title, setTitle] = useState("");
    const[price, setPrice] = useState<number>(0);
    const[image, setImage] = useState("");
    const [error, setError] = useState(""); // Código da Internet, se quebrar sei la...
    const {mutate, isSuccess, isPending} = useFoodDataMutate();

    const submit = () => {

        if (!title || !price || !image) {
            setError("Por favor, preencha todos os campos.");
            return;
          }

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
                    <Input 
                    maxLength={22}
                    label="Título do item" 
                    value={title} 
                    updateValue={setTitle} 
                     />
                    <Input 
                    label="Preço do item" 
                    value={price} 
                    updateValue={setPrice} />
                    <Input 
                    label="Link da imagem do item" 
                    value={image} 
                    updateValue={setImage} />
                </form>
                <div className="error">
                {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <button onClick={submit} className="btn-secondary">
                 {isPending ? 'Carregando...' : 'Incluir'}
                </button>
            </div>
        </div>
    )
}    