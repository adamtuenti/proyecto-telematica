import React, { useState, useEffect } from 'react'

import Select from 'react-select';
import { useNavigate, useLocation } from "react-router-dom";
import { validarSala, agregarUsuarioParticipante, actualizarParticipante } from '../../../api/api';



import { Container, Col, Row, Button } from 'react-bootstrap';





import { FcAlarmClock } from 'react-icons/fc';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './nivel1.css'







export default function Nivel1() {



  const history = useNavigate();
  const location = useLocation()

  const [tiempo, setTiempo] = useState(15)
  const [uid, setUid] = useState('')
  let tiempoA = 15

  const [puntaje, setPuntaje] = useState(0)
  let puntajeTemp = 0



  useEffect(() => {
    setUid(location.state.uid);
    
  }, [])




  



  const actualizarUsuario = () => {

    console.log('actualizar: ', puntaje, puntajeTemp)

    actualizarParticipante(location.state.uid, puntaje, 1)
    history('/nivel2', {state: {uid: location.state.uid, puntos: puntaje}})



  }



  const [sala, setSala] = useState('')
  const [estado, setEstado] = useState('')
  const [respuestas, setRespuestas] = useState(['', ''])
  const paginaActual = window.location.href;


  const [preguntaActual, setPreguntaActual] = useState(0)
  let preguntaActualTemp = 0;




  const questions = [
    {
      question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
      answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
      correctAnswer: 2,
    },
    {
      question: "Cuál es el propósito de la máscara de red (Subnet Mask) en el direccionamiento IPv4?",
      answers: ["A) Identificar la dirección IP de broadcast de la red.", "B) Definir el número de hosts disponibles en una red.", "C) Establecer la dirección IP del enrutador predeterminado.", "D) Indicar el rango de direcciones IP válidas en una red. "],
      correctAnswer: 3
    },
    {
      question: "Cuál es la diferencia entre una dirección IP de host y una dirección IP de red?",
      answers: ["A) Identifican dispositivo vs. identifican red ", "B) Enrutamiento vs. transmisión", "C) Dirección física vs. dirección lógica", "D) Comunicación local vs. comunicación interredes"],
      correctAnswer: 0
    },

    {
      question: "¿Cuál es el formato de una dirección IP válida en IPv4?",
      answers: ["A) 192.168.0.256 ", "B) 2001:0db8:85a3:0000:0000:8a2e:0370:7334", "C) 172.31.0.1", "D) ::1"],
      correctAnswer: 2
    },

    {
      question: "¿Cuál es la máscara de subred por defecto para una dirección IP de Clase C en IPv4?",
      answers: ["A) 255.255.0.0", "B) 255.255.255.0", "C) 255.0.0.0", "D) 255.255.255.255"],
      correctAnswer: 3
    },

    {
      question: "¿Cuál de las siguientes opciones representa una dirección IP válida?",
      answers: ["A) 192.168.300.10 ", "B) 10.0.0.256", "C) 172.16.0.1", "D) 256.0.0.1"],
      correctAnswer: 2
    },

    {
      question: "¿Cuál es el número máximo de direcciones IP que se pueden asignar en una subred con una máscara de subred /24 (255.255.255.0) en IPv4?",
      answers: ["A) 512 ", "B) 254", "C) 1024", "D) 65536"],
      correctAnswer: 1
    },
    {
      question: "¿Cuál es la dirección IP de broadcast en una subred con la dirección IP 192.168.1.0/24 en IPv4?",
      answers: ["A) 192.168.1.255 ", "B) 192.168.1.255", "C) 192.168.0.0", "D) 192.168.1.1"],
      correctAnswer: 1
    },

    {
      question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
      answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
      correctAnswer: 2
    }
  ];



  const siguientePregunta = () => {
    preguntaActualTemp = preguntaActualTemp + 1
    if (preguntaActual < questions.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      



      Swal.fire({
        icon: 'success',
        title: 'Acabaste las preguntas!',
        text: 'Puntaje: ' + puntaje + '/' + questions.length, 
        confirmButtonText: "Siguiente nivel"

      }).then(() => {

        actualizarUsuario()
      })


      
    }
  }




  const checkAnswer = (index) => {
    if (questions[preguntaActual].correctAnswer === index) {

      setPuntaje(puntaje + 1)
      puntajeTemp = puntajeTemp + 1

      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
        confirmButtonText: "Siguiente"

      }).then(() => {

        siguientePregunta()
      })

    } else {



      Swal.fire({
        icon: 'error',
        title: 'La respuesta correcta es:',
        text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
        confirmButtonText: "Siguiente"

      }).then(() => {
        siguientePregunta()
      })

    }
  }





  const validarSalaPage = async () => {
    let respuesta = await validarSala(sala)
    setEstado(respuesta)

    if (respuesta.length === 0) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No existe ese id aun...',
      })


    } else {
      let data = { Usuario: 'Adan', Cargo: 'Estudiante', ID: sala }
      agregarUsuarioParticipante(data)
    }
  }




  const a = () => {
    console.log(preguntaActual, preguntaActualTemp, 'hola')
  }



  const tiempoTerminado = () => {
    Swal.fire({
      icon: 'info',
      title: 'Se acabó el tiempo!',
      text: 'Puntaje: ' + puntaje + '/' + questions.length,
      confirmButtonText: "Siguiente nivel"

    }).then(() => {

      actualizarUsuario()
      
    })
  }

  let interval;


  useEffect(() => {


    interval = setInterval(() => {


      console.log('cada: ', window.location.href, puntaje, paginaActual)

      



      console.log(preguntaActual, questions.length, preguntaActualTemp)
      if (preguntaActual === questions.length) {
        console.log('entro aqui')
        clearInterval(interval)
      }




      if (tiempoA > 0) {

        console.log('aqui: ', window.location.href)
        setTiempo((tiempo) => tiempo - 1)
        tiempoA = tiempoA - 1
      } else {
        console.log('aca: ', window.location.href)
        clearInterval(interval)

        if(window.location.href === paginaActual){
          tiempoTerminado()
        }
        
        

      }
    
    }, 1050);



    return;
  }, []);





  return (
    <>
      <div align='center'>



        <div align='center' style={{ backgroundColor: '#97CBEB', width: '105.5px', marginLeft: 'auto', marginRight: 'auto', marginTop: '24.5px', borderRadius: '7.5px', padding: '3.5px' }}>
          <p style={{ fontSize: '24.5px' }}>Puntaje <br /><b>{puntaje} {preguntaActual} {preguntaActualTemp}</b></p>
        </div>

        <div align='center' style={{}}>

          <div style={{ backgroundColor: 'white', width: '59.5%', borderRadius: '24.5px', marginTop: '37.5px', marginleft: '125px', marginRight: '75px', paddingBottom: '14.5px' }}>

            <Button disabled={true} style={{ backgroundColor: 'transparent', width: '67.5px', height: '89.75px', fontSize: '24.5px', borderRadius: '9.75px', borderColor: 'red', textAlign: 'center', marginTop: '14.5px', border: '1.5px solid black' }} align='center'>
              <FcAlarmClock size={37} />
              <p style={{ color: 'black' }}>{tiempo}</p>
            </Button>


            <div id="instrucciones-texto">
              <p style={{ fontSize: '21.75px', fontWeight: 'bold', width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '14.5px', marginBottom: '27.5px' }}>{preguntaActual + 1 + ") "} {questions[preguntaActual].question}</p>

              <div>

                {questions[preguntaActual].answers.map((respuesta, index) => (

                  <div>
                    <Button className="botonOpcion" style={{ width: respuesta.length > 22 ? '475px' : '375px' }} onClick={() => { checkAnswer(index) }}>{respuesta}</Button>



                  </div>

                ))

                }



              </div>







            </div>




          </div>


        </div>
      </div>
    </>
  );
}
