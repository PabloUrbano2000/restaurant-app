import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PedidoContext from '../context/pedidos/pedidoContext';
import globalStyles from '../styles/global';

const FormularioPlatillo = () => {
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const [total, guardarTotal] = useState(0);
  const {precio} = platillo;

  const [cantidad, guardarCantidad] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantidad]);

  const incremento = () => {
    const nuevaCantidad = Math.floor(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  const decremento = () => {
    if (Math.floor(cantidad) <= 1) {
      return;
    } else {
      const nuevaCantidad = Math.floor(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  // calcular el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = Number(precio) * cantidad;
    guardarTotal(totalPagar);
  };

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };

            console.log(pedido);
            guardarPedido(pedido);

            // Navegar hacia el Resumen
            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Cantidad</Text>
      <View style={styles.grilla}>
        <View style={styles.grillaItem}>
          <Icon.Button
            style={styles.menos}
            name="minus"
            onPress={() => decremento()}
          />
        </View>
        <View style={styles.grillaItem}>
          <TextInput
            style={styles.input}
            value={cantidad.toString()}
            keyboardType="numeric"
            onChangeText={val => guardarCantidad(val)}
          />
        </View>
        <View style={styles.grillaItem}>
          <Icon.Button
            style={styles.mas}
            name="plus"
            onPress={() => incremento()}
          />
        </View>
      </View>
      <Text style={styles.cantidad}>Subtotal: S/.{parseFloat(total)}</Text>
      <Pressable
        style={styles.flotante}
        onPress={() => {
          confirmarOrden();
        }}>
        <Text style={styles.boton}>Agregar al Pedido</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  grilla: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  grillaItem: {
    flex: 1,
  },
  menos: {
    backgroundColor: 'black',
    justifyContent: 'center',
    height: 80,
    fontSize: 40,
    color: 'white',
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    color: 'black',
    height: 80,
  },
  mas: {
    backgroundColor: 'black',
    justifyContent: 'center',
    height: 80,
    fontSize: 40,
    color: 'white',
  },
  cantidad: {
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

export default FormularioPlatillo;
