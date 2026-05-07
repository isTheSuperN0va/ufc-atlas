import * as TYPE from "./types.ts";
import { CriarElementoSala } from "./util.ts";

export var roomView: boolean = false;
const hMenuOffset = 12;


// export function Room_Viewer(state: boolean): void {

//   if (state)
//     TYPE.roomViewer.classList.add("active");

//   if (!state)
//     TYPE.roomViewer.classList.remove("active");
  
//   roomView = state;
//   return;
// }

// export function FormatViewer(sala: TYPE.Sala): void {
//   TYPE.rvTitle.textContent = `Sala ${sala.id}`;
// }

// export function AddSalas(dados: TYPE.DadosSalas): void {
//   var rooms = document.getElementsByClassName("room") as HTMLCollectionOf<SVGRectElement>

//   Array.from(rooms).forEach((room) => {
//     room.addEventListener("click", (event) => { 
//       event.stopPropagation();
//       Room_Viewer(true);
//       let salaAFormatar = dados.salas[Number(room.dataset.roomId) - 1]
//       FormatViewer(salaAFormatar); 
//     });
//   })

//     return;
// }

export function RenderizarSalas(salas: TYPE.Sala[]) {
  salas.forEach(sala => {
    sala.renderizar();
    TYPE.mapa.insertAdjacentElement("beforeend", sala.elemento);
    console.log("fnseu")
  })

}

export function ConfigMenuHighlight(salas: TYPE.Sala[]) {
  salas.forEach(sala => {
      sala.elemento.addEventListener("mousemove", (event) => { UpdateHMenuPos(event) })
      sala.elemento.addEventListener("mouseover", () => { OnRoomMouseOver(sala); });
      sala.elemento.addEventListener("mouseleave", () => { OnRoomMouseLeave(); });  
  })
}

export function OnRoomMouseOver(sala: TYPE.Sala) {
  TYPE.highlightMenu.classList.add("active");
  const roomName: HTMLElement = document.createElement("p");
  roomName.textContent = GetRoomName(sala);
  TYPE.highlightMenu.insertAdjacentElement("beforeend", roomName);


  
}

// possivelmente desnecessario
function GetRoomName(sala: TYPE.Sala): string {
  if (sala instanceof TYPE.SalaAula) { return `${sala.prefixo} ${sala.id}`; }
  if (sala instanceof TYPE.Instalacao) { return sala.nome; }

  return "undefined";
}

export function OnRoomMouseLeave() {
  TYPE.highlightMenu.replaceChildren();
}

function UpdateHMenuPos(event: MouseEvent) {
  TYPE.highlightMenu.style.top = `${event.clientY + hMenuOffset}px`;
  TYPE.highlightMenu.style.left = `${event.clientX + hMenuOffset}px`;
}




// document.addEventListener("click", (event: MouseEvent) => {
//     if (!TYPE.roomViewer.contains(event.target as Node) && roomView) {
//       Room_Viewer(true);
//     }
// })

