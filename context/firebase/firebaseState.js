import React, {useReducer} from 'react';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import {OBTENER_PRODUCTOS_EXITO} from '../../types';
import firebase from '../../firebase';
// importaciones necesarias para firestore
import {
  collection,
  // getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import _ from 'lodash';

const FirebaseState = props => {
  // crear state inicial
  const initialState = {
    menu: [],
    error: false,
  };

  // useReducer con distpatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  // Funcion que se ejecuta para traer los productos
  const obtenerProductos = () => {
    try {
      const q = query(
        collection(new firebase().db, 'productos'),
        where('existencia', '==', true),
      );

      // const querySnapshot = await getDocs(q);
      // let platillos = querySnapshot.docs.map(doc => {
      //   return {...doc.data(), id: doc.id};
      // });

      onSnapshot(q, manejarSnapshot);

      function manejarSnapshot(snapshot) {
        let platillos = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        // Ordenar por categoria con lodash
        platillos = _.sortBy(platillos, 'categoria');

        // Tenemos resultados de la base de datos
        dispatch({
          type: OBTENER_PRODUCTOS_EXITO,
          payload: platillos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
