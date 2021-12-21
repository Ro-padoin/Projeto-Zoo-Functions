const data = require('../data/zoo_data');

// funcao verifica se todos os animais de uma especie possuem a idade minima especificada.
// recebe como parametros o nome de uma especie e idade, retorna true ou false.

const { species } = data; // desestruturei o species, onde estão as informacoes necessarias para a funcao serao retiradas da chave species - arquivo data.

function getAnimalsOlderThan(animal, age) {
  return species.find((especie) => especie.name === animal).residents // dentro da chave species busco o primeiro animal que seu nome é compativel com o parametro passado e acesso sua chave residents.
    .every((item) => item.age >= age); // dentro dos residents testo se todos os animais possuem a idade >= o parametro informado. 
    // a hof every testa se todos os elementos atendem a condição e retorna um bool.
}

module.exports = getAnimalsOlderThan;
