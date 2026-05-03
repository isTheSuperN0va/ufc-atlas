import * as TYPE from "./types.ts";


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

function AnchorMouse(event: MouseEvent) {
  isDragging = true; 
  anchor_x = event.clientX;
  anchor_y = event.clientY;

  start_cam_x = cam_x;
  start_cam_y = cam_y;
}

function CalcGrabVector(event: MouseEvent) {
  if (!isDragging) return;

  dx = anchor_x - event.clientX;
  dy = anchor_y - event.clientY;
  console.log("mouse movendo")

  cam_x = start_cam_x + dx * scale_x;
  cam_y = start_cam_y + dy * scale_y;


  
  TYPE.mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);
}

function HandleZoom(event: WheelEvent) {
  event.preventDefault();

  let newZoom = zoom + event.deltaY

  if (zoom + event.deltaY > max_zoom)
    newZoom = max_zoom;

  if (zoom + event.deltaY < min_zoom)
    newZoom = min_zoom;

  console.log(TYPE.mapa.getAttribute("viewBox"));
  console.log(dx);

  zoom = newZoom;
  TYPE.mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);

}







TYPE.mapa.addEventListener("wheel", (event) => { HandleZoom(event); });

TYPE.mapa.addEventListener("mousedown", (event) => { AnchorMouse(event); });
TYPE.mapa.addEventListener("mouseup", () => { isDragging = false; });
TYPE.mapa.addEventListener("mousemove", (event) => { CalcGrabVector(event); });
TYPE.mapa.setAttribute("viewBox", `${cam_x} ${cam_y} ${zoom} ${zoom}`);