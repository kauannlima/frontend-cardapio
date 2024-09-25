
import './Cardapio.css'
import { CardCliente } from '../components/card/cardcliente';
import { useFoodDataCliente } from '../hooks/useFoodDataCliente';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';

const TelaLogin = () => {
  window.location.href = '/';
};

function CardapioCliente() {
  const { data } = useFoodDataCliente();

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        
        {data?.map(foodData => 
        <CardCliente
        price={foodData.price} 
        title={foodData.title} 
        image={foodData.image}
        />
        )}
</div>
<button className="btn-cardapio" onClick={TelaLogin}>
        <FaArrowLeft size={16} />
      </button>
    </div>
  );
}

export default CardapioCliente;