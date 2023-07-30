// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";



import { collection, getDocs, query, where, addDoc } from "firebase/firestore"




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuMsuVfqYYmL8OQo-MjTSAk9Iq6H8us-0",
  authDomain: "proyecto-integrador-5965f.firebaseapp.com",
  databaseURL: "https://proyecto-integrador-5965f-default-rtdb.firebaseio.com",
  projectId: "proyecto-integrador-5965f",
  storageBucket: "proyecto-integrador-5965f.appspot.com",
  messagingSenderId: "1008393056098",
  appId: "1:1008393056098:web:ebfc38439c83fdc615863b",
  measurementId: "G-T4649F265N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const validarSala = async(id) => {
    const collection_ref =  collection(db, "Sesiones")
    const query_ref = query(collection_ref, where("ID", "==", id))
    const datos = await getDocs(query_ref)


    let dataFinal = []

    datos.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataFinal.push(doc.data())
    });


    return dataFinal;
}



export const agregarUsuarioParticipante = async(data) => {
  let dataRef = await addDoc(collection(db, "Participantes"), data);
  return dataRef.id
}



export const crearId = async(data) => {
  await addDoc(collection(db, "Sesiones"), data)
}



export const verParticipantes = async(id) => {

  const collection_ref =  collection(db, "Participantes")
    const query_ref = query(collection_ref, where("ID", "==", id))
    const datos = await getDocs(query_ref)


    let dataFinal = []

    datos.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataFinal.push(doc.data())
    });

    console.log('aca: ', dataFinal)


    return dataFinal;

  return [{Usuario: 'Adan'}]

}



export const actualizarParticipante = async(id, calificacion, nivel) => {
  console.log('datos: ', id, calificacion, nivel)
  const docRef = doc(db, 'Participantes', id)
  await updateDoc(docRef, {
    Nivel: nivel,
    Calificacion: calificacion
  })
  
}