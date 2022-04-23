import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Alert, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import PedidoContext from '../context/pedidos/pedidoContext';
import globalStyles from '../styles/global';

import {collection, addDoc} from 'firebase/firestore';
import firebase from '../firebase';

const ResumenPedido = () => {
  const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} =
    useContext(PedidoContext);

  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce((tot, articulo) => tot + articulo.total, 0);

    mostrarResumen(nuevoTotal);
  };

  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no podrás cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear un objeto
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };

            try {
              //ACA NOS QUEDAMOS
              const res = await addDoc(
                collection(new firebase().db, 'ordenes'),
                pedidoObj,
              );
              pedidoRealizado(res.id);
              // redireccionar a progreso
              navigation.navigate('ProgresoPedido');
            } catch (error) {
              console.log(error);
            }
          },
        },
        {text: 'Revisar', style: 'cancel'},
      ],
    );
  };

  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Deseas eliminar este artículo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // Eliminar del state
            eliminarProducto(id);
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <View style={globalStyles.contenedor}>
      <ScrollView>
        <View style={globalStyles.contenido}>
          <Text style={globalStyles.titulo}>Resumen Pedido</Text>
          {pedido.map(item => {
            const {
              cantidad,
              nombre,
              imagen,
              id,
              precio,
              total: totalPlatillo,
            } = item;
            return (
              <View key={id}>
                <View style={styles.contenidoPlatillo}>
                  <View style={styles.contenedorImagen}>
                    <Image
                      source={{
                        uri: imagen,
                      }}
                      style={styles.imagen}
                    />
                  </View>

                  <View style={styles.contenedorDerecho}>
                    <Text style={styles.nombre}>{nombre}</Text>
                    <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>
                    <Text style={styles.precio}>Precio: S/.{precio}</Text>
                    <Text style={styles.subtotal}>
                      Subtotal: S/.{totalPlatillo}
                    </Text>
                    <View style={styles.contenedorBtn}>
                      <Pressable
                        style={styles.btnEliminar}
                        onPress={() => confirmarEliminacion(id)}>
                        <Text style={styles.btnEliminarTexto}>Eliminar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          <Text style={styles.total}>Total a Pagar: S/.{total}</Text>
          <Pressable
            style={styles.btnSeguirPidiendo}
            onPress={() => {
              navigation.navigate('Menu');
            }}>
            <Text style={styles.btnSeguirPidiendoTexto}>Seguir Pidiendo</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable
        style={styles.btnOrdenarPedido}
        onPress={() => progresoPedido()}>
        <Text style={styles.btnOrdenarPedidoTexto}>Ordenar Pedido</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
  },
  contenidoPlatillo: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: '2.5%',
    flexDirection: 'row',
  },
  contenedorImagen: {
    justifyContent: 'center',
  },
  imagen: {
    width: 90,
    height: 90,
  },
  contenedorDerecho: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
    width: '100%',
  },
  nombre: {
    color: '#00213d',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  cantidad: {
    fontSize: 14,
  },
  precio: {
    fontSize: 14,
  },
  subtotal: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  total: {
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contenedorBtn: {
    width: '100%',
  },
  btnEliminar: {
    backgroundColor: '#ce1818',
    padding: 8,
    flex: 1,
  },
  btnEliminarTexto: {
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  btnSeguirPidiendo: {
    backgroundColor: '#0057a0',
    padding: 15,
    marginHorizontal: '2.5%',
    marginBottom: 80,
  },
  btnSeguirPidiendoTexto: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  btnOrdenarPedido: {
    width: '100%',
    backgroundColor: '#0057a0',
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  btnOrdenarPedidoTexto: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default ResumenPedido;
