const { prices } = require('../data/zoo_data');
const data = require('../data/zoo_data');

// funcao que listara os participantes por faixa etaria, hof escolhida foi o reduce em razao do retorno ser objeto e esta permite iniciar com objeto vazio.

const pessoasPorFaixa = (entrants) => entrants.reduce((populacao, entrada) => { // populacao = acumulador e entrada = participantes(poderia ter chamado de participante);
  let { adult, child, senior } = populacao; // esestruturacao das chaves do obj populacao para atendimento do lint.
  if (entrada.age < 50 && entrada.age >= 18) adult += 1; // percorrido o parametro recebido (array) verifica-se as condicoes e adiciona 1 a chave inicial do array. Poderia nao ter colocado o if para adult, pois caso nao atendesse as demais condicoes, adult estaria amparada.
  if (entrada.age < 18) child += 1;
  if (entrada.age >= 50) senior += 1;
  return { adult, child, senior }; // retorna o acumulador da forma desestruturadas.
}, { adult: 0, child: 0, senior: 0 });

// EXPLICACAO DO CODIGO COMECA ABAIXO:
// funcao que calcula a faixa etaria das pessoas que entram no zoologico, aqui chamadas de participantes(entrants).
// recebe como parametro um array como nome e idade de cada participante e deve retornar um objeto com o total de pessoas por faixa etaria.

function countEntrants(entrants) {
  if (entrants === undefined) return 0; // se a funcao for chamada sem parametro seu retorno será zero;
  return pessoasPorFaixa(entrants); // senão sera chamada a funcao que listara o numero de participantes por faixa etaria.
}

// SEGUNDA PARTE CODIGO:
// funcao que calcula o preco da entrada de acordo com a idade do participante.
// para o resultado correto, precisei buscar os precos dos ingressos, definidos no arquivo data nomeado como prices e compara-los a idade passada no parametro.

const precoTotal = (entrants) => entrants.reduce((acumulador, entrant) => { 
  const { age } = entrant; // desestruturei a chave age do parametro, para manipular com mais facilidades os dados recebidos;
  const { adult, senior, child } = prices; // busca pelo arquivo de precos, onde possui as chaves com os valores para adult, child e senior, usei a desestruturacao de objetos para manipular melhor os valores retornados por essas chaves.
  if (age < 18) return Number((acumulador + child).toFixed(2)); // usei toFixed para apresentar 2 casas após a virgula e Number para tranformar o retorno do toFixed (que é string) em numero novamente, atendendo ao esperado como resultado.
  if (age >= 50) return Number((acumulador + senior).toFixed(2)); // atendidas as condicoes o acumulador é somado ao valor do ingresso em cada chave.
  return Number((acumulador + adult).toFixed(2));
}, 0);

// a explicação inicia abaixo:
// a funcao recebe um array de objeto com nome e idade do participante e com isso deve devolver o preco da entrada.

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0; // verifica se nao for definido um parametro ou um objeto vazio o retorno devera ser zero.
  const precos = precoTotal(entrants); // variavel criada para armazenar o calculo do preco, chamando a funcao preco total, recebe o mesmo parametro que a funcao que a chama.
  return precos; // retorna o preco do ingresso.
}

module.exports = { calculateEntry, countEntrants };
