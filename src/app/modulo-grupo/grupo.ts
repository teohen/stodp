export class Grupo {

    constructor(private id?: number,
        private titulo?: string,
        private tema?:string,
        private status?:number){
    }
    setTema(tema: string){
        this.tema = tema;
    }
    setTitulo(titulo: string){
        this.titulo = titulo;
    }
    setId(id: number){
        this.id = id;
    }
    getId(): number{
        return this.id;
    }
}

