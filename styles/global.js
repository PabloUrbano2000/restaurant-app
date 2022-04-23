import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  boton: {
    backgroundColor: '#FFDA00',
    marginHorizontal: 40,
    padding: 7,
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
});

export default globalStyles;
