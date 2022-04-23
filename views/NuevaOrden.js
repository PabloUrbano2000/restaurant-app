import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

import globalStyles from '../styles/global';

import {useNavigation} from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <Pressable
          style={styles.boton}
          onPress={() => {
            navigation.navigate('Menu');
          }}>
          <Text style={styles.botonTexto}>Nueva Orden</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  contenido: {
    ...globalStyles.contenido,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  boton: {
    ...globalStyles.boton,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 20,
  },
  botonTexto: {
    ...globalStyles.botonTexto,
    textAlign: 'center',
    color: 'black',
  },
});

export default NuevaOrden;
