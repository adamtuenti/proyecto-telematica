import React, {useState, useEffect} from 'react'
//import './login.css';
import Select from 'react-select';
import { useNavigate  } from "react-router-dom";
import { verParticipantes, crearId } from '../api/api';



export default function UserList() {



  useEffect(() => {
    // Update the document title using the browser API
    let id = Math.floor(Math.random() * 999999);
    let data = {ID: id, Estado: 'E'}
    setId(id)
    crearId(data)
  }, []);



    const history = useNavigate ();



    const [id, setId] = useState('')




  



  return (
    <>
    <div>
  
  <section id="pantalla-inicial">
  <h1>¡QuizMaster!</h1>
    <div id="instrucciones-texto">
      <h3>Inicio de sesión {id}</h3>
      

    </div>

    <button id="iniciar" onClick={() => {iniciarSalaPage()}}>INICIAR</button>
  


  </section>
 
  </div>
    </>
  );
}
