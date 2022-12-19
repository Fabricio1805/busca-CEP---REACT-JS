import { useState } from "react";
import { apiCep } from "./services/apiCep";
import "./app.css"

type AdressInfo = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

const App = () => {
  const [ adress, setAdress ] = useState<AdressInfo>();
  const [ zipCode, setZipCode ] = useState<string>("");
  const [ number, setNumber ] = useState<string>();
  const validateZipCode = zipCode?.length === 8;

  const seachAdress = () => {
    if(validateZipCode){
      apiCep.get(`${zipCode}/json/`)
      .then((response) => {
        if(response.data.erro) {
          alert("CEP não encontrado")
        }

        setAdress(response.data)
      }).catch(err => console.log(err))
    }else{
      alert("CEP inválido!")
    }
  }

  console.log(adress)

  
  return (
    <div>
      
      <form >
       <h1>consultar endereço</h1>
        <label>CEP</label>
        <div>
          <input 
            type="number" 
            id="zipCode" 
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}  
          />

          {validateZipCode ?
            <button type="button" onClick={seachAdress}>Buscar Endereço</button>
            :
            <button type="button" onClick={seachAdress} disabled>Buscar Endereço</button>
          }
          
        </div>

        <label>Endereço</label>
        <input 
          type="text" 
          id="street"
          value={adress?.logradouro}
        />

        <label>Numero</label>
        <input 
          type="number" 
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}  
        />

        <label>Cidade</label>
        <input type="text" 
        id="city"
          value={adress?.localidade}
        />

        <label>Bairro</label>
        <input 
          type="text" 
          id="district"
          value={adress?.bairro}  
        />

        <label>UF</label>
        <input type="text" id="uf" value={adress?.uf}/>

  </form>
    </div>
  )
}

export default App;