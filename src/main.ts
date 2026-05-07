import * as UI from "./ui.ts";
import * as TYPE from "./types.ts"
import * as UTIL from "./util.ts"
import * as MAP from "./mapa.ts"

fetch("/salas.json").then(response => response.json()).then((dados: TYPE.DadosInput) => {
    const rooms: (TYPE.Sala | null)[] = TYPE.FabricarSalas(dados.salas);
    const facilities: (TYPE.Sala | null)[] = TYPE.FabricarSalas(dados.instalacoes);

    if (!UTIL.hasNoNull(rooms)) return;
    if (!UTIL.hasNoNull(facilities)) return;

    UI.RenderRooms(rooms);
    UI.RenderRooms(facilities);
    UI.ConfigMenuHighlight(rooms);
    UI.ConfigMenuHighlight(facilities);


    MAP.InitMapControls();
    
})


//TODO:
// Remover roomviewer, é inutil com a nova idea ok~
// Dar uma arrumada melhor nos modulos ok
// Terminar o mapeamento do proximo bloco
// Adicionar os nomes de todas as salas(?)
// Substituir narrowing por propriedado de "tipo"? possivelmente por typeof



