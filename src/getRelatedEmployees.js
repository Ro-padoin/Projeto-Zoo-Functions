const data = require('../data/zoo_data');

const { employees } = data;

function isManager(id) {
  const buscandoGerente = employees
    .reduce((totalGerente, employee) => totalGerente.concat(...employee.managers), []);
  return buscandoGerente.includes(id);
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  if (isManager(managerId)) {
    const filtro = employees
      .filter((employee) => employee.managers.some((item) => item === managerId));
    const resultado = filtro.map((pessoa) => `${pessoa.firstName} ${pessoa.lastName}`);
    return resultado;
  }
}

module.exports = { isManager, getRelatedEmployees };
