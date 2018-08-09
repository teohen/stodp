export class Post { 
    constructor(private id?: number,
        private idUsuario?: number,
        private idGrupo?:number,
        private post?:string,
        private data?:string){
    }
    setId(id: number){
        this.id = id;
    }
    setIdGrupo(idGrupo: number){
        this.idGrupo = idGrupo;
    }
    setIdUsuario(idUsuario: number){
        this.idUsuario = idUsuario;
    }
    setPost(post: string){
        this.post = post;
    }
    setData(data: string){
        this.data = data;
    }
    getPost(){
        return this.post;
    }

}