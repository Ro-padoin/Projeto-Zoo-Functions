const data = require('../data/zoo_data');

// funcao realiza a contagem dos animais de cada especie.
// recebe como parametro um objeto com a cheve specie ou specie e sex e devolve um objeto com o resultado.
// resolvi usar o reduce em razao do retorno ser um objeto e neste caso, defini seu valor inicial como objeto vazio.
// algumas condicoes precisam ser atendidas: se receber objeto com specie devolve um objeto com nome e total de residentes; se recebido specie e sex: devolve o total de residentes da especie no sexo especificado; se nao definido parametro: retornar todos os animais e o total de residentes cada um.

function countAnimals(animal) {
  const { species } = data; // busquei do arquivo data a chave species e desestruturei;
  if (animal === undefined) { // se nao definido parametro, usando o reduce, percorro todo a chave species, crio uma variavel para receber o spread do objeto inicial(totalResidentes), para que espalhe os resultados num objeto somente -> Lint, e a cada residente adiciono a chave name atribuindo como seu valor o total de residentes de todos os animals.
    return species.reduce((totalResidentes, residente) => {
      const obj = { ...totalResidentes };
      obj[residente.name] = residente.residents.length;
      return obj;
    }, {});
  }
  const { specie, sex } = animal; // recebendo duas chaves, desestruturo para facilitar a manipulacao dos dados.
  if (specie !== undefined && sex !== undefined) { // se as duas existirem, busco os residente do animal que seu nome seja igual ao parametro specie.
    const specieListSex = species.find((especie) => especie.name === specie).residents
      .filter((item) => item.sex === sex); // filtro os residentes buscando pelo sexo compativel com o parametro.
    return specieListSex.length; // retorno o total.
  }
  if (specie !== undefined) { // se specie existir, faco o mesmo que acima, porem busco o total de residentes, independente so sexo.
    const specieList = species.find((especie) => especie.name === specie).residents;
    return specieList.length;
  }
}

module.exports = countAnimals;
