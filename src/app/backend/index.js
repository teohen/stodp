const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var erros = require('./erros');
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.listen(3000, function(){
    console.log("API funcionando");
});

function getConexao(){
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'stodo'
    });
}

var validacao = function(token){
    try{
        jwt.verify(token, 's3gr34o');
    }catch(err){
        return false;
    }
    return true;
}

verificaParticipacao = function(id_usuario, id_grupo, callback){
    var con = getConexao();
    var buscaSQL = "SELECT id_usuario FROM participacao WHERE id_usuario = ? AND id_grupo = ?"
    con.query(buscaSQL, [id_usuario, id_grupo], function(err, result){
        if(err){
            con.end();
            callback(err, null);
        }else{
            if(result[0] == undefined){
                con.end();
                callback(null, null);
            }else{
                con.end();
                callback(null, result[0]);
            }
        }
    });
}

app.post('/usuarios/autenticacao/login', (req, res) => {
    var usuario = req.body.usuario;
    var senha =  req.body.senha;
    con = getConexao();
    sqlBusca = "SELECT id_usuario, usuario, senha FROM usuario WHERE usuario = ?";
        con.query(sqlBusca, [usuario], function(err, result){
        if(err){
            res.status(400).send(erros.criaErro('conexao'));
            con.end();
        }else{
            if(result[0]){
                if(bcrypt.compareSync(senha, result[0].senha)){
                   var token = jwt.sign({id: result[0].id_usuario, usuario: result[0].usuario}, 's3gr34o', {expiresIn: '1h'});
                   res.send({message: 'ok', token: token});
                   con.end();
                }else{
                    res.status(400).send(erros.criaErro('login'));
                    con.end();
                }
            }else{
                res.status(400).send(erros.criaErro('login'));
                con.end();
            }
        }
    });
});

app.get('/autenticacao/grupo/:id', (req, res) => {
    var token = req.headers.token;
    if(!validacao(token)){
        res.status(400).send(erros.criaErro('autenticacao'));
    }else{
        var con = getConexao();
        var buscaAutorizacaoGrupo = "SELECT id_usuario FROM participacao WHERE id_usuario = ? AND id_grupo = ?";
        var usuario = jwt.decode(token);
        con.query(buscaAutorizacaoGrupo, [usuario.id, req.params.id], function(err, result){
            if(err){
                res.status(400).send(erros.criaErro('conexao'));
                con.end(); 
            }else{
                if(result[0] == undefined){
                    res.status(400).send(erros.criaErro('permissao'));
                    con.end();
                }else{
                    res.send(data = {message: 'ok'});
                    con.end();
                }
            }
        });
    }
});

app.post('/usuarios/novo', (req, res) => {
    var usuario = {
        usuario: req.body.usuario,
        senha: req.body.senha,
        email: req.body.email,
        status: 1
    }
    var con = getConexao();
    var sql = "INSERT INTO usuario SET ?";
    bcrypt.hash(usuario.senha, 10, function(err, hash){
        if(err){
            res.status(400).send(erros.criaErro('geral'));
        }else{
            usuario.senha = hash;
            con.query(sql, usuario, function(error){
                if(error){
                    if(error.code == 'ER_DUP_ENTRY'){
                        res.status(400).send(erros.criaErro('chave_duplicada'));
                        con.end();
                    }
                    else{
                        res.status(400).send(erros.criaErro('conexao'));
                        con.end();
                    }
                }else{
                    res.send({message: 'ok'});
                    con.end();
                }
            }); 
        }
    }); 
});

app.get('/autenticacao', (req, res) => {
    var token = (req.headers.token);
    try{
        jwt.verify(token, 's3gr34o');
        res.send(data = {message: 'ok'});
    }catch(err){
        res.status(400).send(erros.criaErro('autenticacao'));
    }
});

app.get('/grupos', (req, res) => {
    var token = req.headers.token;
    if(!validacao(token)){
        res.status(400).send(erros.criaErro('autenticacao'));
    }else{
        var con = getConexao();
        var usuario = jwt.decode(token);
        var buscaSQL = "SELECT grupo.id_grupo, tema, titulo, admin FROM grupo, participacao WHERE participacao.id_usuario = ? AND participacao.id_grupo = grupo.id_grupo";
        con.query(buscaSQL, [usuario.id], function(err, result){
            if(err){
                res.status(400).send(erros.criaErro('conexao'));
                con.end();
            }else{
                res.send(data = result);
                con.end();
            }
        });
    }
});

app.get('/grupos/:id', (req, res) => {
    var token = req.headers.token;
    if(!validacao(token)){
        res.status(400).send(erros.criaErro('autenticacao'));
    }else{
        var con = getConexao();
        var usuario = jwt.decode(token);
        var buscaSQL = "SELECT id_grupo, tema, titulo FROM grupo WHERE id_grupo = ?";
        con.query(buscaSQL, [req.params.id], function(err, result){
            if(err){
                res.status(400).send(erros.criaErro('conexao'));
                con.end();
            }else{
                res.send(data = result[0]);
                con.end();
            }
        });
    }
});

app.get('/grupos/:id/posts', (req, res) => {
    var token = req.headers.token;
    if(!validacao(token)){
        res.status(400).send(erros.criaErro('autenticacao')); 
    }else{
        var usuario = jwt.decode(token);
        verificaParticipacao(usuario.id, req.params.id, function(err, resultado){
            if(err){
                res.status(400).send(erros.criaErro('conexao')); 
            }else{
                if(resultado == null){
                    res.status(400).send(erros.criaErro('permissao')); 
                }else{
                    var con = getConexao();
                    var buscaSQL = "SELECT usuario.usuario,post,data FROM post, usuario WHERE id_grupo = ? AND usuario.id_usuario = post.id_usuario ORDER BY id_post LIMIT 0, 50";
                    con.query(buscaSQL, [req.params.id], function(err, result){
                        if(err){
                            res.status(400).send(erros.criaErro('conexao')); 
                            con.end();
                        }else{
                            res.send(data = result);
                            con.end();
                        }         
                    });
                }
            }
        });
    }
});

app.get('/grupos/chat/:id', (req, res) => {
    var idGrupo = req.params.id;
    var token = req.headers.token;
    if(!validacao(token)){
        res.status(400).send(erros.criaErro('autenticacao')); 
    }else{
        var usuario = jwt.decode(token);
        verificaParticipacao(usuario.id, idGrupo, function(err, resultado){
            if(err){
                res.status(400).send(erros.criaErro('conexao')); 
            }else{
                if(resultado == null){
                    res.status(400).send(erros.criaErro('permissao'));
                }else{
                    res.send({message: 'ok', idUsuario: usuario.id});
                }
            }
        });
    }
});

io.on('connection', (socket) => {

    socket.on('post', (post) => {
        var con = getConexao();
        var sql = "INSERT INTO post SET ?";
        
        var novoPost = {
            id_usuario: post.idUsuario,
            id_grupo: post.idGrupo,
            post: post.post,
            data: new Date()
        }
        con.query(sql, novoPost, function(err){
            if(err){
                
            }else{
                con.query("SELECT usuario FROM usuario WHERE id_usuario = ?", [post.idUsuario], function(err, result){
                    if(err){

                    }else{
                        if(result[0] != undefined){
                            var mensagem = {
                                usuario: result[0].usuario,
                                post: novoPost.post,
                                data: novoPost.data
                            }   
                            io.emit('mensagem', {post: mensagem});
                        }
                    }
                });
            }
        });
    });
});

http.listen(3300, () =>{
    console.log('iniciado');
});

app.get('/', function(req, res){
    res.json({message: 'ok'});
});
app.get('*', function(req, res){
    res.redirect('/');
});