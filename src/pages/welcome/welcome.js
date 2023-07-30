import React from 'react'
import './welcome.css';
import { useNavigate  } from "react-router-dom";



export default function Welcome () {



  const history = useNavigate ();




  return (
    <>
    <div>
  
  <section id="pantalla-inicial">
    <p id = 'bienvenido'>¡Bienvenido a Subnet Master!</p>
    <p id = 'text1'>Demuestra tus habilidades, supera obstáculos a lo largo de diferentes niveles, que reforzaran tus conceptos.</p>
    <button style = {{width: '150px', borderRadius: '7.5px', borderColor: 'transparent', height: '49.5px', backgroundColor: 'red'}} onClick={() => {history('/login')} } id="comenzar">COMENZAR</button>
  </section>
 
  </div>
    </>
  );
}
