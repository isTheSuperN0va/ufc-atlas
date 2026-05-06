import * as UTIL from "./util.ts";

export const mapa = document.getElementById("map") as HTMLElement;
export const roomViewer = document.getElementById("roomViewer") as HTMLElement;
export const rvTitle = document.getElementById("RVTitle") as HTMLHeadElement
export const highlightMenu = document.getElementById("highlightMenu") as HTMLDivElement;

export type Vec2 = {
  x: number,
  y: number
}

export type Cadeira = {
  nome: string,
  professor: string
}

export interface Sala {
  renderizar(): void,
  elemento: SVGRectElement,
}

export class SalaAula implements Sala {

  public elemento: SVGRectElement;
  
  constructor(private id: number = 0,
              private prefixo: string = "",
              private pos: [x: number, y: number] = [0, 0],
              private tam: [largura: number, altura: number] = [0, 0],
              private cronograma: (Cadeira | null)[][] = [[null]]
              ) {
  this.elemento = UTIL.CriarElementoSala(this.tam[0], this.tam[1], this.pos[0], this.pos[1]);
  
  }

  renderizar(): void {
    this.elemento.setAttribute("data-room-id", String(this.id));
    this.elemento.classList.add("room");
  }
}

export class Instalacao implements Sala {
  public elemento: SVGRectElement;

  constructor(private nome: string = "Instalação",
              private pos: [x: number, y: number] = [0, 0],
              private tam: [largura: number, altura: number] = [0, 0],
              ) {
  this.elemento = UTIL.CriarElementoSala(this.tam[0], this.tam[1], this.pos[0], this.pos[1]);
  }
  

  renderizar(): void {
    this.elemento.setAttribute("data-room-name", String(this.nome));
  }
}

export function FabricarSalas(salas: InstalacaoInput[] | SalaAulaInput[]): (Sala | null)[] {

  return salas.map(sala => {
    switch (sala.tipo) {
      case "salaDeAula":
      return new SalaAula(sala.id, 
                          sala.prefixo,
                          sala.pos,
                          sala.tam,
                          sala.cronograma);
      
      case "instalacao":
      return new Instalacao(sala.nome, 
                            sala.pos,
                            sala.tam
                            );
      default:
        return null;
      }
      
  })
}

export type DadosInput = {
  salas: SalaAulaInput[],
  Instalacoes: InstalacaoInput[]
}


type TipoSala = "salaDeAula" | "instalacao";

type TSala = {
  tipo: TipoSala;
}


type InstalacaoInput = TSala & {
  tipo: "instalacao",
  nome: string,
  pos: [x: number, y: number],
  tam: [largura: number, altura: number]
}

type SalaAulaInput = TSala & {
  tipo: "salaDeAula",
  id: number,
  prefixo: string,
  pos: [x: number, y: number],
  tam: [largura: number, altura: number],
  cronograma: (Cadeira | null)[][]
}

