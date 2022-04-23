import React, {useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import PedidoContext from '../context/pedidos/pedidoContext';
import globalStyles from '../styles/global';

const DetallePlatillo = () => {
  const {platillo} = useContext(PedidoContext);

  const {nombre, imagen, descripcion, precio} = platillo;
  const navigation = useNavigation();

  return (
    <View style={globalStyles.contenedor}>
      <ScrollView>
        <View style={globalStyles.contenido}>
          <Text style={globalStyles.titulo}>{nombre}</Text>
          <View>
            <View style={styles.body}>
              <Image source={{uri: imagen}} style={styles.imagen} />
              <Text style={styles.descripcion}>{descripcion}</Text>
              <Text style={styles.precio}>Precio: S/.{precio}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable
        style={styles.flotante}
        onPress={() => navigation.navigate('FormularioPlatillo')}>
        <Text style={styles.boton}>Ordenar Platillo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  imagen: {
    height: 300,
  },
  descripcion: {
    marginTop: 20,
  },
  precio: {
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  flotante: {
    width: '100%',
    backgroundColor: '#0057a0',
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  boton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default DetallePlatillo;
