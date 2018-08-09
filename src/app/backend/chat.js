var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("conectado");
    socket.on('disconnect', function(){
    console.log('disconectado');
    });
    socket.on('mensagem', (mensagem) => {
        console.log(mensagem);
        io.emit('mensagem', {mensagem: mensagem});
    });
});
http.listen(3300, () =>{
    console.log('iniciado');
})