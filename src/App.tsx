import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { data, refetch } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleDelete = async (id: string) => {
    try {
        await axios.delete(`http://localhost:8080/food/${id}`);
        refetch();
    } catch (error) {
        console.error('Error deleting food item:', error);
    }
}

const handleEdit = (id: string) => {
  alert(`Este recurso ainda está em desenvolvimento... Enquanto isso, veja que o ID deste item é: ${id}`);
}

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        
        {data?.map(foodData => 
        <Card 
        price={foodData.price} 
        title={foodData.title} 
        image={foodData.image}
        onEdit={() => handleEdit(foodData.id?.toString() || '')}
        onDelete={() => handleDelete(foodData.id?.toString() || '')}
        />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button className='btn-secondary' onClick={handleOpenModal}>Novo</button>
    </div>
  )
}

export default App
