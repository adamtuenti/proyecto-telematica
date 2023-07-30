import React, {useState} from 'react'
//import './login.css';
import Select from 'react-select';
import { useNavigate, useLocation  } from "react-router-dom";
import { validarSala, agregarUsuarioParticipante } from '../../api/api';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'



import Table from 'react-bootstrap/Table';







export default function WaitingRoom() {



    const history = useNavigate ();
    const location = useLocation()



    const [sala, setSala] = useState('')
    const [estado, setEstado] = useState('')



    const validarSalaPage = async() => {
      let respuesta = await validarSala(sala)
        setEstado(respuesta)

        if(respuesta.length === 0){

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe ese id aun...',
          })
          

        }else{
          let data = {Usuario: location.state.nombre, Cargo: 'Estudiante', ID: sala, Calificacion: -5, Nivel: 0}
          agregarUsuarioParticipante(data).then((uidRef) => {
            console.log('uid: ', uidRef)
            history('/nivel1', {state: {uid: uidRef}})
          })
          
        }
    }





  return (
    <>
    <div>
  
  <section id="pantalla-inicial">
    <div id="instrucciones-texto">
      <p style = {{fontSize: '27.5px', fontWeight: 'bold', marginTop: '34.5px'}}>Bienvenido {location.state.nombre}!</p>
      <input style = {{width: '55%', borderRadius: '14.5px', fontSize: '18.75px', padding: '7.5px', marginTop: '19.5px', marginBottom: '24.5px'}} type = "text" placeholder="Ingrese el id de la sala: " id ="inputLabel" onChange={(text) => {setSala(text.target.value)}}></input>



 



    </div>

    <button onClick = {() => {validarSalaPage()}} id="iniciar">INICIAR</button>
  


  </section>
 
  </div>
    </>
  );
}
