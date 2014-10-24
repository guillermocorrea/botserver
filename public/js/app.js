var socket = io.connect(Config.baseUrl);
    socket.on(Config.movement, function (data) {
        appendMessage(data, 'debug');
        console.log(data);
	});
	socket.on(Config.error, function (data) {
        appendMessage(data, 'error');
        console.error(data);
	});

	$("#button-up").click(function (e) {
		socket.emit(Config.movement, Config.moves.up);
	});
	$("#button-down").click(function (e) {
		socket.emit(Config.movement, Config.moves.down);
	});
	$("#button-wrong").click(function (e) {
		socket.emit(Config.movement, 'wrong');
	});

	function appendMessage(message, type) {
		var html = "<div>" + moment().format() + " <span class=\"" + type + "\">" + type + ": </span> " +  message + "</div>";
		$("#console-log").append(html);
		var objDiv = document.getElementById("console-log");
		objDiv.scrollTop = objDiv.scrollHeight;

		// $("#console-log").scrollTop();
	}