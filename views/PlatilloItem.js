import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

import PedidoContext from '../context/pedidos/pedidoContext';
import {useNavigation} from '@react-navigation/native';

const PlatilloItem = ({platillo}) => {
  const {nombre, imagen, descripcion, precio} = platillo;

  const {seleccionarPlatillo} = useContext(PedidoContext);

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        seleccionarPlatillo(platillo);
        navigation.navigate('DetallePlatillo');
      }}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <Image
            source={{
              uri: imagen,
            }}
            style={styles.imagen}
          />
          <View style={styles.contenedorDerecho}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <Text style={styles.precio}>Precio: S/.{precio}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
  },
  contenido: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imagen: {
    width: 80,
    height: 80,
  },
  contenedorDerecho: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  nombre: {
    color: '#00213d',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  descripcion: {
    maxHeight: 50,
    color: '#aaaaaa',
  },
  precio: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlatilloItem;
