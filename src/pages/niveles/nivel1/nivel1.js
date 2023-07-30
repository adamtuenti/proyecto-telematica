import React, { useState, useEffect } from 'react'
//import './login.css';
import Select from 'react-select';
import { useNavigate, useLocation } from "react-router-dom";
import { validarSala, agregarUsuarioParticipante, actualizarParticipante } from '../../../api/api';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import './nivel1.css'







export default function Nivel1() {



  const history = useNavigate();
  const location = useLocation()

  const [tiempo, setTiempo] = useState(120)
  const [uid, setUid] = useState('')
  let tiempoA = 120

  const [puntaje, setPuntaje] = useState(0)



  useEffect(() => {
    setUid(location.state.uid);
    //alert(location.state.uid)
  }, [])




  useEffect(() => {


    setInterval(() => {





      if (tiempoA > 0) {

        console.log('aqui')
        setTiempo((tiempo) => tiempo - 1)
        tiempoA = tiempoA - 1
      } else {
        actualizarUsuario()
        history('/')
      }
      /*
          Run a function or set any state here
      */
    }, 1050);
  }, []);



  const actualizarUsuario = () => {

    actualizarParticipante(location.state.uid, puntaje, 1)



  }



  const [sala, setSala] = useState('')
  const [estado, setEstado] = useState('')
  const [respuestas, setRespuestas] = useState(['', ''])


  const [preguntaActual, setPreguntaActual] = useState(0)




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
    if (preguntaActual < questions.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      //alert('ya no hay preguntas.')
      actualizarUsuario()
    }
  }




  const checkAnswer = (index) => {
    if (questions[preguntaActual].correctAnswer === index) {



      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
        confirmButtonText: "Siguiente"

      }).then(() => {
        setPuntaje(puntaje + 1)
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





  return (
    <>
      <div>



        <div align='center' style = {{backgroundColor: 'red', width: '97.5px', marginLeft: 'auto', marginRight: 'auto', marginTop: '24.5px', borderRadius: '7.5px', padding: '3.5px'}}>
          <p style = {{fontSize: '19.5px'}}>Puntaje <br/>{puntaje}</p>
          <p style={{ fontSize: '24.5px', borderRadius: '9.75px' }}></p>
        </div>

        <section id="pantalla-inicial">

          <button disabled = {true} style={{ backgroundColor: 'green', width: '59.5px', height: '45.5px', fontSize: '24.5px', borderRadius: '9.75px', borderColor: 'black', textAlign: 'center', marginTop: '14.5px' }} align='center'>
            <p>{tiempo}</p>
          </button>


          <div id="instrucciones-texto">
            <p style={{ fontSize: '21.75px', fontWeight: 'bold', width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '14.5px' }}>{preguntaActual + 1 + ") "} {questions[preguntaActual].question}</p>

            <div>

              {questions[preguntaActual].answers.map((respuesta, index) => (

                <div>
                  <button className="botonOpcion" style={{ width: respuesta.length > 18 ? '475px' : '475px' }} onClick={() => { checkAnswer(index) }}>{respuesta}</button>



                </div>

              ))

              }



            </div>







          </div>




        </section>

      </div>
    </>
  );
}
