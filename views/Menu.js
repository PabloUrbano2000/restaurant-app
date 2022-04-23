import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import globalStyles from '../styles/global';
import Categoria from './Categoria';
import Platillos from './Platillos';

const Menu = () => {
  // Context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  const [menuCategoria, obtenerMenuCategoria] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      await obtenerProductos();
    };
    cargarProductos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (menu !== []) {
      const arregloCategorias = [];
      menu.forEach(item => {
        arregloCategorias.push(item.categoria);
      });

      const nombreCategorias = [...new Set(arregloCategorias)];

      let arregloDef = [];

      nombreCategorias.forEach(cat => {
        arregloDef.push({categoria: cat, items: []});
      });

      arregloDef.forEach(obj => {
        menu.forEach(item => {
          if (item.categoria === obj.categoria) {
            obj.items.push(item);
          }
        });
      });

      obtenerMenuCategoria(arregloDef);
    }
  }, [menu]);

  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          {menuCategoria.length > 0 &&
            menuCategoria.map(item => (
              <View key={`${item.categoria}-cont`}>
                <Categoria
                  key={`${item.categoria}-cat`}
                  categoria={item.categoria}
                />
                <Platillos
                  key={`${item.categoria}-plat`}
                  platillos={item.items}
                />
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  contenido: {},
});

export default Menu;
