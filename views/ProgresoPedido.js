import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidoContext';
import firebase from '../firebase';
import {doc, onSnapshot} from 'firebase/firestore';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
  const {idPedido} = useContext(PedidoContext);
  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const obtenerProducto = () => {
      onSnapshot(doc(new firebase().db, 'ordenes', idPedido), document => {
        guardarTiempo(document.data().tiempoEntrega);
        guardarCompletado(document.data().completado);
      });
    };

    obtenerProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Muestra el countdown en la pantalla
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}
      </Text>
    );
  };

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        {tiempo === 0 && (
          <>
            <Text style={styles.textRecibido}>Hemos recibido tu orden...</Text>
            <Text style={styles.textRecibido}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text style={styles.textRecibido}>Su orden estará lista en:</Text>
            <Text style={styles.tiempo}>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}
        {completado && (
          <>
            <Text style={styles.textCompletado}>Orden Lista</Text>
            <Text style={styles.textCompletado}>
              Por favor, pase a recoger su pedido
            </Text>
            <Pressable
              style={styles.btnNuevaOrden}
              onPress={() => navigation.navigate('NuevaOrden')}>
              <Text style={styles.btnNuevaOrdenTexto}>
                Comenzar una Orden Nueva
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    marginTop: 50,
  },
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
  textRecibido: {
    textAlign: 'center',
    color: '#2a2e38',
  },
  textCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 10,
  },
  btnNuevaOrden: {
    backgroundColor: '#2b3d75',
    color: '#2a2e38',
    padding: 20,
    marginTop: 100,
    borderRadius: 10,
  },
  btnNuevaOrdenTexto: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProgresoPedido;
