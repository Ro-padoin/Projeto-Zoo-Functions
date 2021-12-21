const data = require('../data/zoo_data');

const { hours, species } = data;
const animalNome = species.map((animal) => animal.name);
const diasDaSemana = Object.keys(hours);

function agendaMonday(scheduleTarget) {
  return {
    [scheduleTarget]: {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    },
  };
}

function agendaPorAnimal(scheduleTarget) {
  const agendaIndividual = species.filter((item) => item.name.includes(scheduleTarget));
  return agendaIndividual.reduce((totalAgenda, dia) => {
    totalAgenda.push(...dia.availability);
    return totalAgenda;
  }, []);
}

function agendaPorDia(scheduleTarget, agenda, exibicao) {
  return {
    [scheduleTarget]: {
      officeHour: `Open from ${agenda.open}am until ${agenda.close}pm`,
      exhibition: exibicao,
    },
  };
}

function getSchedule(scheduleTarget) {
  if (!diasDaSemana.includes(scheduleTarget) && !animalNome
    .includes(scheduleTarget)) {
    return diasDaSemana.reduce((agendaTotal, dia) => ({
      ...agendaTotal,
      ...getSchedule(dia),
    }), {});
  }
  if (animalNome.includes(scheduleTarget)) return agendaPorAnimal(scheduleTarget);
  const exibicao = species.filter((especie) => especie.availability
    .includes(scheduleTarget)).map((elemento) => elemento.name);
  const agenda = hours[scheduleTarget];
  if (scheduleTarget === 'Monday') return agendaMonday(scheduleTarget);
  return agendaPorDia(scheduleTarget, agenda, exibicao);
}

module.exports = getSchedule;
