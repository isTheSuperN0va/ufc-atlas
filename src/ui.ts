import * as TYPE from "./types.ts";

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

export function RenderRooms(rooms: TYPE.Sala[]) {
  rooms.forEach(room => {
    room.renderizar();
    TYPE.mapa.insertAdjacentElement("beforeend", room.elemento);
    console.log("fnseu")
  })

}

export function ConfigMenuHighlight(rooms: TYPE.Sala[]) {
  rooms.forEach(room => {
      room.elemento.addEventListener("mousemove", (event) => { UpdateHMenuPos(event) })
      room.elemento.addEventListener("mouseover", () => { OnRoomMouseOver(room); });
      room.elemento.addEventListener("mouseleave", () => { OnRoomMouseLeave(); });  
  })
}

function OnRoomMouseOver(room: TYPE.Sala) {
  TYPE.highlightMenu.classList.add("active");
  const roomName: HTMLElement = document.createElement("p");
  roomName.textContent = GetRoomName(room);
  TYPE.highlightMenu.insertAdjacentElement("beforeend", roomName);
  
}

// possivelmente desnecessario. mover pra utils?
function GetRoomName(room: TYPE.Sala): string {
  if (room instanceof TYPE.SalaAula) { return `${room.prefixo} ${room.id}`; }
  if (room instanceof TYPE.Instalacao) { return room.nome; }

  return "undefined";
}

function OnRoomMouseLeave() {
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

