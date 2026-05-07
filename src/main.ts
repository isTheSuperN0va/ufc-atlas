import * as UI from "./ui.ts";
import * as TYPE from "./types.ts"
import * as UTIL from "./util.ts"


fetch("/salas.json").then(response => response.json()).then((dados: TYPE.DadosInput) => {
    const salas: (TYPE.Sala | null)[] = TYPE.FabricarSalas(dados.salas);
    const instalacoes: (TYPE.Sala | null)[] = TYPE.FabricarSalas(dados.instalacoes);

    if (!UTIL.hasNoNull(salas)) return;
    if (!UTIL.hasNoNull(instalacoes)) return;

    UI.RenderizarSalas(salas);
    UI.RenderizarSalas(instalacoes);

    // UI.AddSalas(dados);

    UI.ConfigMenuHighlight(salas);
    UI.ConfigMenuHighlight(instalacoes);

    
})


//TODO:
// Remover roomviewer, é inutil com a nova idea
// Dar uma arrumada melhor nos modulos
// Terminar o mapeamento do proximo bloco
// Adicionar os nomes de todas as salas(?)
// Substituir narrowing por propriedado de "tipo"? possivelmente por typeof



