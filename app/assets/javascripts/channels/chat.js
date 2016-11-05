var ready = function() {
	var room = $('#chat-room').data('room');
	if (!!room) {
		var me = $('#messages').data('me');
		App.chat = App.cable.subscriptions.create({channel: 'ChatChannel', 
				room: room }, {

		  received: function(data) {
		  	$('#messages tbody').append(this.renderMessage(data));
		  	$("#messages").scrollTop($('#messages table').height());
		  },
		  	// Шаблон сообщения
		  renderMessage: function(data) {
		  	var tr_class;
		  	if (me == data.sender_id) { tr_class = 'mine' };
				return "<tr class='" + tr_class + "' sender='" + data.sender_id + "'>" + 
					"<td>" + 
						"<div class='content'>" +
							"<div class='sender'>" +
								data.sender_name + 
							"</div>" +
							"<div class='body'>" +
								data.message + 
							"</div>" +
						"</div>" +
					"</td>" + 
				"</tr>"
		  }
		});
	};
};

$(document).ready(ready);
