import React from 'react';
import PlatilloItem from './PlatilloItem';

const Platillos = ({platillos = []}) => {
  return (
    <>
      {platillos.map(platillo => (
        <PlatilloItem key={platillo.id} platillo={platillo} />
      ))}
    </>
  );
};

export default Platillos;
