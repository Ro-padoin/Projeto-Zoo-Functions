const data = require('../data/zoo_data');

// funcao deve buscar o primeiro animal mais velho do qual o funcionario é responsável.
// recebe como parametro o id do funcionario e deve retornar um array de arrays com nome, sexo, idade do primeiro mais velho.
const { employees, species } = data; // chaves onde serao retirados os dados.

function getOldestFromFirstSpecies(id) { 
  const primeiroAnimalResp = employees.find((numeroId) => numeroId.id === id).responsibleFor[0]; // busca o primeiro animal que o funcionario é responsavel, ou seja, a posicao zero deste item.
  const animal = species.find((especie) => especie.id === primeiroAnimalResp).residents; // dentro de species, busco o primeiro animal que o id é compativel com o resultado da variavel acima e trago a chave residents onde estarao todos os dados dos animais. 
  return animal.reduce((maisVelho, especie) => { // o retorno será um reduce, onde o valor inicial é um array.
    if (especie.age > maisVelho[2]) { // percorrendo os residentes, inicio a comparacao de suas idades com o acumulador inicial na posicao 2 que iniciara com 0, percorrera todos os residents e vai alimentar o acumulador com a idade e comparar novamente.
      return [especie.name, especie.sex, especie.age]; // atendida o acumulador recebera o nome, sexo e idade do animal.
    }
    return maisVelho; // resultado final sera o acumulador.
  }, ['', '', 0]);
}

module.exports = getOldestFromFirstSpecies;
