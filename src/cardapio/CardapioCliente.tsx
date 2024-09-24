
import './Cardapio.css'
import { CardCliente } from '../components/card/cardcliente';
import { useFoodDataCliente } from '../hooks/useFoodDataCliente';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    </div>
  );
}

export default CardapioCliente;