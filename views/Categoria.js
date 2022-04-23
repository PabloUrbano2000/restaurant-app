import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Categoria = ({categoria}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{categoria}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#0057a0',
    justifyContent: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
  },
});

export default Categoria;
