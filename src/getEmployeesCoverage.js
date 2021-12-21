const data = require('../data/zoo_data');

// funcao para encontrar a cobertura dos funcionarios sobre os animais.
// recebe como parametro um objeto que pode conter - name (nome ou sobrenome) ou id;
// deve retornar um objeto com id e nome completo do funcionario e nome e localizacao dos animais dos quais ele é responsável.

const { employees, species } = data; // essas informacoes serao retiradas das chaves species e employees do arquivo data.

function getEmployeesCoverage(dadosEmployee) {
  if (dadosEmployee === undefined) return employees.map(getEmployeesCoverage); // se estiver sem parametro, deve retornar a lista completa de todos os funcionarios. Usei recursividade: employees esta sendo mapeado e cada employee esta sendo passado a funcao.
  const { name, id } = dadosEmployee; // se tiver parametro, pode vir com name ou id, entao ja desestruturei o objeto.
  const verificaEmployee = employees.find((employee) => employee // essa variavel armazena o objeto com os dados do funcionario, resultado da busca pelo funcionario baseado no parametro.
    .firstName === name || employee.lastName === name || employee.id === id);
  if (verificaEmployee === undefined) { throw new Error('Informações inválidas'); } // não encontrado, sera lancado um erro.
  const dadosAnimais = verificaEmployee.responsibleFor.reduce((acumulador, animalId) => { // senao, usando o reduce com valor inicial um array com specie e location, dentro da chave responsibleFor do funcionario encontrado,
    const especieEncontrada = species.find((especie) => especie.id === animalId);// percorrendo os animais, busco dentro de species pelo primeiro animal que atenda a condicao.
    acumulador.species.push(especieEncontrada.name); // a cada animal encontrado a chave species recebe o nome do animal;
    acumulador.locations.push(especieEncontrada.location); // e a chave locations recebe a localizacao do animal.
    return acumulador; // retorno o acumulador.
  }, { species: [], locations: [] });
  return { // o retorno da funcao será este.
    id: verificaEmployee.id,
    fullName: `${verificaEmployee.firstName} ${verificaEmployee.lastName}`,
    species: dadosAnimais.species,
    locations: dadosAnimais.locations,
  };
}

module.exports = getEmployeesCoverage;
