import { useState, useEffect } from 'react';
// .pets = es el estado
// .setPets => es la funcion que actualiza mi estado
//([]) inicializar el estado , tambien podemos pasar un estado inicial en un arreglo

const useGetPets = (url) => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setPets(data));
  }, []);
  return pets;
}

export default useGetPets;