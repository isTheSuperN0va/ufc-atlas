export function CriarElementoSala(largura: number, altura:number, x: number, y: number): SVGRectElement {
  const nova_sala: SVGRectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  nova_sala.setAttribute("width", String(largura));
  nova_sala.setAttribute("height", String(altura));
  nova_sala.setAttribute("x", String(x));
  nova_sala.setAttribute("y", String(y));
  
  nova_sala.setAttribute("fill", "white");
  nova_sala.setAttribute("stroke", "black");
  

  return nova_sala;

} 