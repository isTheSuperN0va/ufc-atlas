var room_view: boolean = false;
var mapa = document.getElementById("map") as HTMLElement;
const room_Viewer = document.getElementById("roomViewer") as HTMLElement;
const rv_title = document.getElementById("RVTitle") as HTMLHeadElement

type Vec2 = {
  x: number,
  y: number
}

type Cadeira = {
  nome: string,
  professor: string
}

type Sala = {
  id: number,
  prefixo: string,
  pos: [x: number, y: number],
  tam: [largura: number, altura: number]
  cronograma: (Cadeira | null)[][]
}

type NSala = {
  nome: string
  pos: [x: number, y: number],
  tam: [largura: number, altura: number]
}

type DadosSalas = {
  nsalas: NSala[],
  salas: Sala[];
}

var dadosGlobal: DadosSalas = {
  nsalas: [],
  salas: []
};

function Room_Viewer(): void {
  console.log(room_view)

  if (room_view)
    room_Viewer.classList.add("active");

  if (!room_view)
    room_Viewer.classList.remove("active");
  
  return;
}

function FormatViewer(sala: Sala): void {
  rv_title.textContent = `Sala ${sala.id}`;
}

function CriarElementoSala(largura: number, altura:number, x: number, y: number): SVGRectElement {
  const nova_sala: SVGRectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  nova_sala.setAttribute("width", String(largura));
  nova_sala.setAttribute("height", String(altura));
  nova_sala.setAttribute("x", String(x));
  nova_sala.setAttribute("y", String(y));
  
  nova_sala.setAttribute("fill", "white");
  nova_sala.setAttribute("stroke", "black");
  

  return nova_sala;

} 

function AddSalaMapa(sala: Sala): void {
  const nova_sala: SVGRectElement = CriarElementoSala(sala.tam[0], sala.tam[1], sala.pos[0], sala.pos[1]);
  nova_sala.setAttribute("data-room-id", String(sala.id));
  nova_sala.classList.add("room");

  mapa.insertAdjacentElement("beforeend"  , nova_sala);

}

function AddSalas(dados: DadosSalas): void {
  var rooms = document.getElementsByClassName("room") as HTMLCollectionOf<SVGRectElement>

  Array.from(rooms).forEach((room) => {
    room.addEventListener("click", (event) => { 
      event.stopPropagation();
      room_view = true; 

      Room_Viewer();
      let salaAFormatar = dados.salas[Number(room.dataset.roomId) - 1]
      FormatViewer(salaAFormatar); 
    });
  })

    return;
}

function AddNSalaMapa(dados: NSala) {
  const nova_sala: SVGRectElement = CriarElementoSala(dados.tam[0], dados.tam[1], dados.pos[0], dados.pos[1]);
  nova_sala.setAttribute("data-room-name", String(dados.nome));

  mapa.insertAdjacentElement("beforeend", nova_sala);
}

// Controles de camera

let zoom: number = 1000;
let max_zoom: number = 4000;
let min_zoom: number = 100;

let isDragging: boolean = false;
let anchor_x = 0;
let anchor_y = 0;
let dx = 0;
let dy = 0;
let cam_x = 1;
let cam_y = 1;
let scale_x = zoom / 700;
let scale_y = zoom / 700;
let start_cam_x = cam_x;
let start_cam_y = cam_y; 



mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);

document.addEventListener("click", (event: MouseEvent) => {
    if (!room_Viewer.contains(event.target as Node) && room_view) {
      room_view = false;
      Room_Viewer();
    }
})




mapa.addEventListener("wheel", (event) => {
  event.preventDefault();

  let newZoom = zoom + event.deltaY

  if (zoom + event.deltaY > max_zoom)
    newZoom = max_zoom;

  if (zoom + event.deltaY < min_zoom)
    newZoom = min_zoom;

  console.log(mapa.getAttribute("viewBox"));
  console.log(dx);

  zoom = newZoom;
  mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);


})



mapa.addEventListener("mousedown", (event) => { 
  isDragging = true; 
  anchor_x = event.clientX;
  anchor_y = event.clientY;

  start_cam_x = cam_x;
  start_cam_y = cam_y;
})
mapa.addEventListener("mouseup", (event) => { isDragging = false; })

mapa.addEventListener("mousemove", (event) => {
  event.stopPropagation();
  
  if (!isDragging) return;

  dx = anchor_x - event.clientX;
  dy = anchor_y - event.clientY;
  console.log("mouse movendo")

  cam_x = start_cam_x + dx * scale_x;
  cam_y = start_cam_y + dy * scale_y;


  
  mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);
})





fetch("/salas.json").then(response => response.json()).then((dados: DadosSalas) => {
    dadosGlobal = dados;
    console.log(dados)

    dados?.salas.forEach(sala => {
      AddSalaMapa(sala);
    });

    dados?.nsalas.forEach(n_sala => {
      AddNSalaMapa(n_sala)
    })

    AddSalas(dados);
})






