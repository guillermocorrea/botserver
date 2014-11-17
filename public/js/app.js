var socket = io.connect();
socket.on(Config.movement, function (data) {
    appendMessage(data, 'debug');
    console.log(data);
});
socket.on(Config.error, function (data) {
    appendMessage(data, 'error');
    console.error(data);
});

$("#button-up").click(function (e) {
    socket.emit(Config.movement, getData(Config.moves.up));
});
$("#button-down").click(function (e) {
    socket.emit(Config.movement, getData(Config.moves.down));
});
$("#button-wrong").click(function (e) {
    socket.emit(Config.movement, 'wrong');
});

function appendMessage(message, type) {
    var html = "<div>" + moment().format() + " <span class=\"" + type + "\">" + type + ": </span> " + JSON.stringify(message) + "</div>";
    $("#console-log").append(html);
    var objDiv = document.getElementById("console-log");
    objDiv.scrollTop = objDiv.scrollHeight;

    // $("#console-log").scrollTop();
}

function getData(instruction) {
    return {
        "move": {
            "token": "", //(token de autorización generado por OpenID google)
            "userid": "", //(el userid de OpenID google)
            "data": {
                "instruction": instruction, //(Instrucción del movimiento UP, DOWN, OPEN, CLOSE, CALIBRATE )
                "value": "" //(Cuando la opción es CALIBRATE se coloca el tamaño del huevo a utilizar, inicialmente no se utilizará pero puede ser útil este campo)
            }
        }
    };
}