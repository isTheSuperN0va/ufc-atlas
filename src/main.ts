import * as UI from "./ui.ts";
import * as TYPE from "./types.ts"


fetch("/salas.json").then(response => response.json()).then((dados: TYPE.DadosSalas) => {
    TYPE.ReceberDados(dados);
    console.log(dados);

    dados?.salas.forEach(sala => {
      UI.AddSalaMapa(sala);
    });

    dados?.nsalas.forEach(n_sala => {
      UI.AddNSalaMapa(n_sala)
    })

    UI.AddSalas(dados);

    const roomsElements = Array.from(document.getElementsByClassName("room")) as Array<HTMLElement>;
    UI.ConfigMenuHighlight(roomsElements, dados);

    
})


//TODO:
// Remover roomviewer, é inutil com a nova idea
// Dar uma arrumada melhor nos modulos
// Terminar o mapeamento do proximo bloco
// Adicionar os nomes de todas as salas(?)



