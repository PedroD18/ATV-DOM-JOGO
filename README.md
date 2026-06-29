# ATV-DOM-JOGO  

**NOME: PEDRO DANIEL SOUZA LEAL**  

**MECÂNICA ESCOLHIDA E O TEMA DO JOGO**  

Encontre o Diferente: uma grade de quadrados com a mesma cor, com exceção de um que tem a cor levemente diferente. O jogador precisa achar e clicar nele.  

**BRIEFING DO CLIENTE**  

Cliente: Festa / vários jogadores  

**REGRAS DO JOGO**  

- O jogador digita o nome e aperta jogar para começar.
- A cada rodada aparece uma grade, o jogador clica no quadrado de cor diferente.
- Acerto: ganha pontos base e tambem pelo multiplicador de combo e passa para a próxima rodada.
- Erro: perde 5 pontos e o combo volta para x1.
- A partida dura 30 segundos, quando o tempo zera o jogo termina.
- Quando acabar a partida aparecem o nome do jogador, a pontuação e o botão jogar novamente.

*Restrições*  
1. Interação 100% via tela nada de console.
2. Botão "Jogar" para iniciar.
3. Eu defini a quantidade de elementos e o tamanho da grade (de 2x2 até 6x6).
4. Eu defini a fórmula de pontuação (10 × combo, com penalidade de 5 por erro).
5. A pontuação é atualizada na tela a cada clique.
6. Eu defini o critério de tempo (30 segundos por partida).
7. Eu defini como o jogo termina (quando o tempo chega a 0).
8. Ao finalizar, informo nome, pontuação e a opção de jogar novamente.

**DIFERENCIAL**  

Sistema de Combo: Cada acerto seguido sem errar aumenta o multiplicador, os pontos do acerto são 10 × combo, se errar o combo zera.  

**COMO JOGAR**  

1. Digite seu nome.
2. Aperte jogar.
3. Clique no quadrado de cor diferente o mais rápido possível.
4. Mantenha a sequência de acertos para aumentar o combo e fazer mais pontos.
5. Veja seu ranking.

**COMO EXECUTAR**  

- Acessar pelo link:
- Clone o repositório e abra o arquivo index.html no navegador, use a extensão Live Server e clique em open.

**MINHAS DECISÕES**  

1. Tamanho e formato do grid: Começa em 2x2 e cresce até 6x6.
2. Quantidade de cores/elementos: Não existe uma grande variedade e bem simples o layout.
3. Fórmula de pontuação: 10 × combo por acerto e menos 5 por erro.
4. Critérios de tempo: Partida única de 30 segundos.
5. Curva de dificuldade: A grade cresce a cada 3 rodadas e a diferença de cor diminui com o tempo, ficando cada vez mais difícil enxergar o quadrado diferente.
6. Condição de término: O jogo acaba quando o cronômetro chega a 0.

**REFLEXÃO**

1. Qual foi o bug mais chato e como resolveu?
O cronômetro continuava depois do fim do jogo e passava para a partida seguinte. Com isso resolvi com clearInterval em finalizarJogo e também no começo de iniciarJogo.
2. Por que escolheu essa fórmula de pontuação?
Porque o cliente é festa / competitivo, o combo recompensa sequências de acertos e cria o clima de copetição, e a penalidade por erro faz cada tentativa ter um valor maior. 
3. Como o briefing do cliente mudou suas decisões?
Por ser festa / vários jogadores deixei a partida curta de 30s priorizei o ranking competitivo e o combo. Se o cliente fosse criança de 6 anos eu usaria grade fixa pequena um ritmo lento e sem penalidade.
4. Se tivesse mais uma semana, o que mudaria?
Adicionaria animações no acerto, e usaria formas ou simbolos.
5. Aponte uma função sua que ficou boa e explique o que ela faz.
A função `gerarGrade()`, limpa a grade anterior pelo dom, calcula o tamanho da grade e a diferença de cor da rodada atual, sorteia a posição do quadrado diferente e cria todos os quadrados marcando com `dataset.diferente`.

**BÔNUS**

Ranking dos melhores jogadores: As pontuações ficam salvas no `localStorage` do navegador. O critério é a maior pontuação, no código js `salvarRanking()` adiciona a pontuação, ordena com `ordenarPorPontos()` e guarda somente os 5 melhores e mostra a lista na tela.

**CRÉDITOS**  

- Site - Node.appendChild(): para criar os quadrados e itens do ranking pelo DOM, sem innerHTML.
  
  https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild
  
- Site - Window.localStorage: para o bônus do ranking, salvar com JSON.stringify e ler com JSON.parse, já que o localStorage só armazena    strings.
  
  https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage
  
- Site - grid-template-columns: usei a notação repeat() para montar a grade com o número de colunas definido pelo JavaScript.

  https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid-template-columns
  
- Site - setInterval(): cronômetro regressivo, adaptei o uso de clearInterval para parar o tempo ao fim da partida.
  
  https://developer.mozilla.org/pt-BR/docs/Web/API/setInterval
  
- Youtube — LocalStorage: apoio para entender o Storage usado no ranking.
  
  https://www.youtube.com/watch?v=pLtAZF8FDXE
  
-  Manipulação de dom
  
   https://www.youtube.com/watch?v=UftSB4DaRU4

**LICENÇA DO PROJETO**  

*Licença MIT*


