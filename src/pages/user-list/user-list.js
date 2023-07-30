import React, { useState, useEffect } from 'react'
//import './login.css';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { verParticipantes, crearId } from '../../api/api';
import Table from 'react-bootstrap/Table';



export default function UserList() {







  const history = useNavigate();



  const [nombre, setNombre] = useState('')
  const [cargo, setCargo] = useState('')
  const [id, setId] = useState('')
  const [conectados, setConectados] = useState([])
  const options = [{ value: 'profesor', label: 'Profesor' }, { value: 'alumno', label: 'Alumno' }]



  useEffect(() => {
    // Update the document title using the browser API
    let id = Math.floor(Math.random() * 999999);
    let data = { ID: id.toString(), Estado: 'E' }
    setId(id)
    crearId(data)

    //console.log('aca: ', verParticipantes(id))
  }, []);




  const actualizarLista = async () => {
    console.log('id: ', id)
    setConectados(await verParticipantes(id.toString()))
  }



  //   useEffect(() => {
  //    ejecutar(id)
  //   })

  // const ejecutar = async (id) => {
  //console.log('veamos: ', await verParticipantes(id))



  setInterval(async () => {



    //setConectados(await verParticipantes(id))


    //console.log('ejecutar.')



  }, 5000
  )



  //setConectados(await verParticipantes(id))
  /*
      Run a function or set any state here
  */
  // }, 300000);





  //console.log('conectados: ', conectados)









  return (
    <div>

      <section id="pantalla-inicial">
        <div id="instrucciones-texto">
          <p style={{ fontSize: '24.5px', fontWeight: 'bold', textAlign: 'center', marginTop: '45.5px' }}>Pin <b> {id} </b></p>



          <button style = {{borderRadius: '7.5px', marginTop: '12.5px'}} onClick={() => { actualizarLista() }}>Actualizar lista</button>



          {conectados.length > 0 ?

            <div style={{ marginTop: '34.5px' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Nivel 1</th>
                    <th>Nivel 2</th>
                    <th>Nivel 3</th>
                    <th>Calificación</th>
                  </tr>
                </thead>
                <tbody>



                  {conectados.map((dato, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{dato.Usuario}</td>
                      <td>{dato.Nivel < 1 ? "-" : "Terminado"}</td>
                      <td>{dato.Nivel < 2 ? "-" : "Terminado"}</td>
                      <td>{dato.Nivel < 3 ? "-" : "Terminado"}</td>
                      <td>{dato.Calificacion === -5 ? 'Aún no termina' : dato.Calificacion}</td>
                    </tr>



                  ))}
                </tbody>
              </Table>



            </div>



            :
            <p style = {{marginTop: '23.5px', fontSize: '19.5px'}}>No hay ningún estudiante en la sala..</p>
          }


        </div>




      </section>

    </div>
  );
}
