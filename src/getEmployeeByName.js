const data = require('../data/zoo_data');

// funcao retorna o objeto referente aos dados do funcionario passado como parametro.
// recebe como parametro uma string - nome do funcionario - e retorna seus dados.
// sem parametros, retorna um objeto vazio.

const { employees } = data; // desestruturei a chave employee do arquivo data onde se encontram as informações dos funcionarios. 

function getEmployeeByName(employeeName) {
  const findEmployees = employees // criei uma variavel para arquivar a busca fo funcionario baseado no parametro.
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName); // na chave employees busco pelo primeiro funcionario que
  // atende a condicao de compatibilidade com o primeiro ou ultimo nome.
  return (findEmployees === undefined ? {} : findEmployees); // o retorno sera o resultado da condicao especificada.
}

module.exports = getEmployeeByName;
