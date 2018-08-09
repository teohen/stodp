module.exports = {
    criaErro: function(nome){
        switch(nome){
            case 'geral':
                return {cod: 100, erro: "erro interno geral"};
                break;
            case 'conversao_token':
                return {cod: 101, erro: "erro de conversao de token"};
                break;
            case 'autenticacao':
                return {cod: 102, erro: "erro de autenticação"};
                break;
            case 'conexao':
                return {cod: 200, erro: "erro de conexão com mysql"};
                break;
            case 'chave_duplicada':
                return {cod: 201, erro: "erro de chave duplicada"};
                break;
            case 'login':
                return {cod: 202, erro: "login ou senha incorretos"};
                break;
            case 'permissao':
                return {cod: 204, erro: "permissao negada"};
                break;
       }
    }
};