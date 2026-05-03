import * as TYPE from "./types.ts";
import { CriarElementoSala } from "./util.ts";

export var roomView: boolean = false;
const hMenuOffset = 12;

export function Room_Viewer(state: boolean): void {

  if (state)
    TYPE.roomViewer.classList.add("active");

  if (!state)
    TYPE.roomViewer.classList.remove("active");
  
  roomView = state;
  return;
}

export function FormatViewer(sala: TYPE.Sala): void {
  TYPE.rvTitle.textContent = `Sala ${sala.id}`;
}

export function AddSalaMapa(sala: TYPE.Sala): void {
  const novaSala: SVGRectElement = CriarElementoSala(sala.tam[0], sala.tam[1], sala.pos[0], sala.pos[1]);
  novaSala.setAttribute("data-room-id", String(sala.id));
  novaSala.classList.add("room");

  TYPE.mapa.insertAdjacentElement("beforeend"  , novaSala);

}

export function AddSalas(dados: TYPE.DadosSalas): void {
  var rooms = document.getElementsByClassName("room") as HTMLCollectionOf<SVGRectElement>

  Array.from(rooms).forEach((room) => {
    room.addEventListener("click", (event) => { 
      event.stopPropagation();
      Room_Viewer(true);
      let salaAFormatar = dados.salas[Number(room.dataset.roomId) - 1]
      FormatViewer(salaAFormatar); 
    });
  })

    return;
}


export function AddNSalaMapa(dados: TYPE.NSala) {
  const nova_sala: SVGRectElement = CriarElementoSala(dados.tam[0], dados.tam[1], dados.pos[0], dados.pos[1]);
  nova_sala.setAttribute("data-room-name", String(dados.nome));

  TYPE.mapa.insertAdjacentElement("beforeend", nova_sala);
}

export function ConfigMenuHighlight(rooms: Array<HTMLElement>, dados: TYPE.DadosSalas) {
  rooms.forEach(room => {
      room.addEventListener("mousemove", (event) => { UpdateHMenuPos(event) })
      room.addEventListener("mouseover", (event) => { OnRoomMouseOver(room, dados); });
      room.addEventListener("mouseleave", () => { OnRoomMouseLeave(); });  
  })
}

export function OnRoomMouseOver(room: HTMLElement, dados: TYPE.DadosSalas) {
  TYPE.highlightMenu.classList.add("active");

  const idSala: number = Number(room.dataset.roomId);
  const sala: TYPE.Sala = dados.salas[idSala];

  const roomName: HTMLElement = document.createElement("p");
  

  roomName.textContent = `${sala.prefixo} ${idSala}`;
  TYPE.highlightMenu.insertAdjacentElement("beforeend", roomName);


  
}

export function OnRoomMouseLeave() {
  TYPE.highlightMenu.replaceChildren();
}

function UpdateHMenuPos(event: MouseEvent) {
  TYPE.highlightMenu.style.top = `${event.clientY + hMenuOffset}px`;
  TYPE.highlightMenu.style.left = `${event.clientX + hMenuOffset}px`;
}


document.addEventListener("click", (event: MouseEvent) => {
    if (!TYPE.roomViewer.contains(event.target as Node) && roomView) {
      Room_Viewer(true);
    }
})

