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

export type Sala = {
  id: number,
  prefixo: string,
  pos: [x: number, y: number],
  tam: [largura: number, altura: number]
  cronograma: (Cadeira | null)[][]
}

export type NSala = {
  nome: string
  pos: [x: number, y: number],
  tam: [largura: number, altura: number]
}

export type DadosSalas = {
  nsalas: NSala[],
  salas: Sala[];
}

export var dadosGlobal: DadosSalas = {
  nsalas: [],
  salas: []
};

export function ReceberDados(dados: DadosSalas): boolean {
    dadosGlobal = dados;
    return true
}