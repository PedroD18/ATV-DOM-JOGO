var estado = {
  nome: "",
  pontuacao: 0,
  combo: 1,
  rodada: 1,
  tempoRestante: 30,
  intervaloCronometro: null
};

var TEMPO_INICIAL = 30;        
var PONTOS_BASE = 10;          
var PENALIDADE_ERRO = 5;       
var TAMANHO_MAXIMO_GRADE = 6;  
var LIMITE_RANKING = 5;       

var telaInicial = document.getElementById("telaPrincipal");
var telaJogo = document.getElementById("tela-jogo");
var telaFinal = document.getElementById("tela-final");
var campoNome = document.getElementById("digitarNome");
var aviso = document.getElementById("aviso");
var botaoJogar = document.getElementById("botao-jogar");
var botaoNovamente = document.getElementById("botao-novamente");
var grade = document.getElementById("grade");
var elementoTempo = document.getElementById("tempo");
var elementoPontuacao = document.getElementById("pontuacao");
var elementoCombo = document.getElementById("combo");

botaoJogar.addEventListener("click", iniciarJogo);
botaoNovamente.addEventListener("click", voltarParaInicio);

function iniciarJogo() {
  var digitaNome = campoNome.value.trim();

  if (digitaNome === "") {
    aviso.textContent = "Digite seu nome primeiro";
    return;
  }
  aviso.textContent = "";

  // cronometro para entre partidas
  clearInterval(estado.intervaloCronometro);

  estado.nome = digitaNome;
  estado.pontuacao = 0;
  estado.combo = 1;
  estado.rodada = 1;
  estado.tempoRestante = TEMPO_INICIAL;

  trocarTela(telaJogo);
  atualizarPontuacao();
  atualizarCombo();
  atualizarTempo();
  gerarGrade();
  iniciarCronometro();
}

function trocarTela(telaParaMostrar) {
  telaInicial.classList.add("escondida");
  telaJogo.classList.add("escondida");
  telaFinal.classList.add("escondida");
  telaParaMostrar.classList.remove("escondida");
}

function voltarParaInicio() {
  campoNome.value = estado.nome; 
  trocarTela(telaInicial);
  mostrarRankingTodos("ranking-inicio");
}


function gerarGrade() {
  while (grade.firstChild) {
    grade.removeChild(grade.firstChild);
  }

  var tamanho = calcularTamanhoGrade(estado.rodada);
  var totalQuadrados = tamanho * tamanho;

  grade.style.gridTemplateColumns = "repeat(" + tamanho + ", 1fr)";

  var matiz = Math.floor(Math.random() * 360);
  var luzBase = 50;
  var diferenca = calcularDiferencaCor(estado.rodada);

  // Sorteio se a cor diferente fica mais clara ou mais escura.
  var direcao = Math.random() < 0.5 ? 1 : -1;

  var corBase = "hsl(" + matiz + ", 70%, " + luzBase + "%)";
  var corDiferente = "hsl(" + matiz + ", 70%, " + (luzBase + diferenca * direcao) + "%)";

  // Sorteio para onde vai estar o quadrado diferente.
  var posicaoDiferente = Math.floor(Math.random() * totalQuadrados);

  var i;
  for (i = 0; i < totalQuadrados; i++) {
    var quadrado = document.createElement("div");
    quadrado.className = "quadrado";

    if (i === posicaoDiferente) {
      quadrado.style.backgroundColor = corDiferente;
      quadrado.dataset.diferente = "true";
    } else {
      quadrado.style.backgroundColor = corBase;
      quadrado.dataset.diferente = "false";
    }

    quadrado.addEventListener("click", horaClick);
    grade.appendChild(quadrado);
  }
}

function horaClick(evento) {
  var quadrado = evento.currentTarget;

  if (quadrado.dataset.diferente === "true") {
    registrarAcerto();
  } else {
    registrarErro();
  }
}

// Sistema de Combo
function registrarAcerto() {
  var pontosGanhos = PONTOS_BASE * estado.combo;
  estado.pontuacao = estado.pontuacao + pontosGanhos;
  estado.combo = estado.combo + 1;
  estado.rodada = estado.rodada + 1;

  atualizarPontuacao();
  atualizarCombo();
  gerarGrade();
}

function registrarErro() {
  estado.pontuacao = estado.pontuacao - PENALIDADE_ERRO;

  if (estado.pontuacao < 0) {
    estado.pontuacao = 0;
  }

  estado.combo = 1;

  atualizarPontuacao();
  atualizarCombo();
}

function atualizarPontuacao() {
  elementoPontuacao.textContent = estado.pontuacao;
}

function atualizarCombo() {
  elementoCombo.textContent = "x" + estado.combo;
}

function atualizarTempo() {
  elementoTempo.textContent = estado.tempoRestante;
}

function calcularTamanhoGrade(rodada) {
  var tamanho = 2 + Math.floor(rodada / 3);
  if (tamanho > TAMANHO_MAXIMO_GRADE) {
    tamanho = TAMANHO_MAXIMO_GRADE;
  }
  return tamanho;
}

function calcularDiferencaCor(rodada) {
  var diferenca = 25 - rodada;
  if (diferenca < 6) {
    diferenca = 6; 
  }
  return diferenca;
}

function iniciarCronometro() {
  estado.intervaloCronometro = setInterval(sistemaCronometro, 1000);
}

function sistemaCronometro() {
  estado.tempoRestante = estado.tempoRestante - 1;
  atualizarTempo();

  if (estado.tempoRestante <= 0) {
    finalizarJogo();
  }
}

function finalizarJogo() {
  clearInterval(estado.intervaloCronometro);

  salvarRanking(estado.nome, estado.pontuacao);

  document.getElementById("nome-final").textContent = estado.nome;
  document.getElementById("pontuacao-final").textContent = estado.pontuacao;

  trocarTela(telaFinal);
  mostrarRankingTodos("ranking-final");
}

function carregarRanking() {
  var dados = localStorage.getItem("rankingJogo");
  if (dados === null) {
    return [];
  }
  return JSON.parse(dados);
}

function salvarRanking(nome, pontos) {
  var ranking = carregarRanking();
  ranking.push({ nome: nome, pontos: pontos });

  ranking.sort(ordenarPorPontos);

  ranking = ranking.slice(0, LIMITE_RANKING);

  localStorage.setItem("rankingJogo", JSON.stringify(ranking));
}

function ordenarPorPontos(a, b) {
  return b.pontos - a.pontos;
}

function mostrarRankingTodos(idDaLista) {
  var lista = document.getElementById(idDaLista);

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  var ranking = carregarRanking();

  if (ranking.length === 0) {
    var vazio = document.createElement("li");
    vazio.textContent = "Vazio";
    lista.appendChild(vazio);
    return;
  }

  var i;
  for (i = 0; i < ranking.length; i++) {
    var item = document.createElement("li");
    item.textContent = ranking[i].nome + " - " + ranking[i].pontos + " pontos";
    lista.appendChild(item);
  }
}