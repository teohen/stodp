export class Usuario {  
    constructor(private usuario?: string,
                private senha?: string,
                private email?:string,
                private status?:number){
    }
    setUsuario(usuario){
        this.usuario = usuario;
    }
    getUsuario(){
        return this;
    }
}
