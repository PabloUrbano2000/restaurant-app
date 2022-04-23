import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import PedidoContext from '../../context/pedidos/pedidoContext';

const BotonResumen = () => {
  const navigation = useNavigation();

  // Leer el objeto de pedido
  const {pedido} = useContext(PedidoContext);
  if (pedido.length === 0) {
    return null;
  }

  return (
    <Pressable
      style={styles.boton}
      onPress={() => navigation.navigate('ResumenPedido')}>
      <Text style={styles.botonTexto}>Ir a Pedido</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: 100,
    backgroundColor: '#0057a5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    fontSize: 17,
    color: 'white',
    fontWeight: '900',
  },
});

export default BotonResumen;
