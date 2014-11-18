var socket = io.connect();
socket.on(Config.movement, function (data) {
    appendMessage(data, 'debug');
    console.log(data);
});
socket.on(Config.status, function (data) {
    appendMessage(data, 'debug');
    console.error(data);
});
socket.on(Config.error, function (data) {
    appendMessage(data, 'error');
    console.error(data);
});

$("#button-up").click(function (e) {
    socket.emit(Config.movement, getDataMovement(Config.moves.up));
});
$("#button-down").click(function (e) {
    socket.emit(Config.movement, getDataMovement(Config.moves.down));
});
$("#button-wrong").click(function (e) {
    socket.emit(Config.movement, 'wrong');
});
$("#button-status").click(function (e) {
    socket.emit(Config.status, getDataStatus('UP_OPEN'));
});

/**
 * Append message to console
 * @param message
 * @param type
 */
function appendMessage(message, type) {
    var html = "<div>" + moment().format() + " <span class=\"" + type + "\">" + type + ": </span> " + JSON.stringify(message) + "</div>";
    $("#console-log").append(html);
    var objDiv = document.getElementById("console-log");
    objDiv.scrollTop = objDiv.scrollHeight;
}

/**
 * Get movement object
 * @param instruction
 * @returns {{move: {token: *, userid: (profile.displayName|*), data: {instruction: *, value: string}}}}
 */
function getDataMovement(instruction) {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = localStorage.getItem('token');
    return {
        "move": {
            "token": token !== null ? token : "", //(token de autorización generado por OpenID google)
            "userid": user !== null ? user.id : "", //(el userid de OpenID google)
            "data": {
                "instruction": instruction, //(Instrucción del movimiento UP, DOWN, OPEN, CLOSE, CALIBRATE )
                "value": "" //(Cuando la opción es CALIBRATE se coloca el tamaño del huevo a utilizar, inicialmente no se utilizará pero puede ser útil este campo)
            }
        }
    };
}

/**
 * Get status object
 * @param status
 * @returns {{consult: {status: *, response: {code: string, message: string}}}}
 */
function getDataStatus(status) {
    return {
        "consult": {
            "status": status, //(Estado en el que se encuentra el robot, después de la ejecución el comando, UP_OPEN, UP_CLOSE, DOWN_OPEN, DOWN_CLOSE)
            "response": {
                "code": "00", //('00' ejecutada exitosamente, '50' problemas de comunicación, ' 80' petición invalida, '90' petición encolada, '99' error desconocido)
                "message": "" // (Mensaje complementario, es opcional, puede ser la cantidad de instrucciones que están pendientes ante de ejecutar la solicitada)
            }
        }
    };
}