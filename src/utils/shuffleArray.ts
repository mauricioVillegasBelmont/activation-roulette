type ArrayType = (object | string | number | boolean | any)[];


const shuffleArray = (array: ArrayType): ArrayType => {
    const shuffledArray = [...array]; // Crear una copia para no modificar el original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const smartShuffle = (shuffleConfig: boolean | number[] | undefined, array: ArrayType): ArrayType => {
    if (shuffleConfig === true) {
        // Shuffle all answers
        return shuffleArray(array);
}
    if (Array.isArray(shuffleConfig)) {
        // Crear una copia del array original
        const resultArray = [...array];
        // Shuffle only specified indices
        const indicesToShuffle = shuffleConfig;
        const itemsToShuffle = indicesToShuffle.map(index => resultArray[index]);
        const shuffledItems = shuffleArray(itemsToShuffle);

        // Replace the shuffled elements in the copied array
        indicesToShuffle.forEach((index, i) => {
            resultArray[index] = shuffledItems[i];
        });

        return resultArray;
    }
    // Si shuffleConfig es undefined o false, retornar el array sin cambios
    return [...array];
};

const intercalate = (array_largo:ArrayType, array_corto:ArrayType)=>{
  const resultado = [];
  const totalA = array_largo.length;
  const totalB = array_corto.length;
  
  if (totalB === 0) return [...array_largo];
  
  const segmentSize = Math.floor(totalA / (totalB + 1));
  let remainder = totalA % (totalB + 1);
  
  let aIndex = 0;
  let bIndex = 0;
  
  for (let i = 0; i <= totalB; i++) {
      // Calcular cuántos elementos de A van en este segmento
      let countA = segmentSize;
      if (remainder > 0) {
          countA++;
          remainder--;
      }
      
      // Agregar elementos de A para este segmento
      for (let j = 0; j < countA && aIndex < totalA; j++) {
          resultado.push(array_largo[aIndex]);
          aIndex++;
      }
      
      // Agregar elemento de B (excepto en el último segmento)
      if (bIndex < totalB) {
          resultado.push(array_corto[bIndex]);
          bIndex++;
      }
  }
  
  return resultado;
}


const  intercalarArrays = (...arrays:ArrayType[]) => {
  arrays.sort((a, b) => b.length - a.length)
  const initialValue: ArrayType = [];
  const reduced = arrays.reduce(
    (accumulator, currentValue) => {
      if(accumulator.length < currentValue.length) return [...accumulator, ... currentValue]
      return intercalate(accumulator, currentValue)
    },
    initialValue,
  );
  return reduced
}


export {
    shuffleArray,
    smartShuffle,
    intercalarArrays,
};