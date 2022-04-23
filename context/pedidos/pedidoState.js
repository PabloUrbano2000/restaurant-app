import React, {useReducer} from 'react';

import PedidoReducer from './pedidoReducer';
import PedidoContext from './pedidoContext';
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from '../../types';

const PedidoState = props => {
  // crear state inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idPedido: '',
  };

  // useReducer con distpatch para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  // Selecciona el Producto que el usuario desea  ordenar
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  // cuando el usuario confirmar un platillo
  const guardarPedido = ped => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: ped,
    });
  };

  // Muestra el total a pagar en el resumen
  const mostrarResumen = tot => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: tot,
    });
  };

  // Elimina un artículo del carrito
  const eliminarProducto = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  const pedidoRealizado = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idPedido: state.idPedido,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
      }}>
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
