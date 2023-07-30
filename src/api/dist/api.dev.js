"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizarParticipante = exports.verParticipantes = exports.crearId = exports.agregarUsuarioParticipante = exports.validarSala = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

// Import the functions you need from the SDKs you need
var firebaseConfig = {
  apiKey: "AIzaSyDuMsuVfqYYmL8OQo-MjTSAk9Iq6H8us-0",
  authDomain: "proyecto-integrador-5965f.firebaseapp.com",
  databaseURL: "https://proyecto-integrador-5965f-default-rtdb.firebaseio.com",
  projectId: "proyecto-integrador-5965f",
  storageBucket: "proyecto-integrador-5965f.appspot.com",
  messagingSenderId: "1008393056098",
  appId: "1:1008393056098:web:ebfc38439c83fdc615863b",
  measurementId: "G-T4649F265N"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var db = (0, _firestore.getFirestore)(app);

var validarSala = function validarSala(id) {
  var collection_ref, query_ref, datos, dataFinal;
  return regeneratorRuntime.async(function validarSala$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collection_ref = (0, _firestore.collection)(db, "Sesiones");
          query_ref = (0, _firestore.query)(collection_ref, (0, _firestore.where)("ID", "==", id));
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(query_ref));

        case 4:
          datos = _context.sent;
          dataFinal = [];
          datos.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            dataFinal.push(doc.data());
          });
          return _context.abrupt("return", dataFinal);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.validarSala = validarSala;

var agregarUsuarioParticipante = function agregarUsuarioParticipante(data) {
  var dataRef;
  return regeneratorRuntime.async(function agregarUsuarioParticipante$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _firestore.addDoc)((0, _firestore.collection)(db, "Participantes"), data));

        case 2:
          dataRef = _context2.sent;
          return _context2.abrupt("return", dataRef.id);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.agregarUsuarioParticipante = agregarUsuarioParticipante;

var crearId = function crearId(data) {
  return regeneratorRuntime.async(function crearId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _firestore.addDoc)((0, _firestore.collection)(db, "Sesiones"), data));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.crearId = crearId;

var verParticipantes = function verParticipantes(id) {
  var collection_ref, query_ref, datos, dataFinal;
  return regeneratorRuntime.async(function verParticipantes$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          collection_ref = (0, _firestore.collection)(db, "Participantes");
          query_ref = (0, _firestore.query)(collection_ref, (0, _firestore.where)("ID", "==", id));
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(query_ref));

        case 4:
          datos = _context4.sent;
          dataFinal = [];
          datos.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            dataFinal.push(doc.data());
          });
          console.log('aca: ', dataFinal);
          return _context4.abrupt("return", dataFinal);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.verParticipantes = verParticipantes;

var actualizarParticipante = function actualizarParticipante(id, calificacion, nivel) {
  var docRef;
  return regeneratorRuntime.async(function actualizarParticipante$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log('datos: ', id, calificacion, nivel);
          docRef = (0, _firestore.doc)(db, 'Participantes', id);
          _context5.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(docRef, {
            Nivel: nivel,
            Calificacion: calificacion
          }));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.actualizarParticipante = actualizarParticipante;