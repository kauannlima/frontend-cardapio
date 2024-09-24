import { useState } from 'react'
import './Cardapio.css'
import { Card } from '../components/card/card';
import { useFoodData } from '../hooks/useFoodData';
import { CreateModal } from '../components/create-modal/create-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

export function getApiUrl(): string | null {
  return localStorage.getItem('API_URL');
}

const Registrar = () => {
  window.location.href = '/register';
};

function Cardapio() {
  const { data, refetch } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleDelete = async (id: string) => {
    const token = getAuthToken();
    const url = getApiUrl();

    try {
      await axios.delete(`${url}/food/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      refetch();
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  const handleEdit = (id: string) => {
    setModalContent(`🚧 Atenção! Este recurso ainda está em construção... 😅
    <br /><br />Mas não se preocupe! Para alegrar seu dia, aqui está o ID deste item: <strong>${id}
    </strong>. <br /><br />Em breve, mais novidades!`);
    setShowModal(true);
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
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button className='btn-cardapio' onClick={handleOpenModal}>Novo Item</button>
      <button className='btn-cardapio' id='funcionario' onClick={Registrar}>Novo User</button>

      {/* Modal para mostrar mensagem - Retirado da Internet e boa!!!*/}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Calma lá, campeão!</h2>
            <p dangerouslySetInnerHTML={{ __html: modalContent }}></p>
            <button className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cardapio;