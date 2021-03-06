   
$(document).ready(function() {
	$('.submit').on('click', onSearchButtonClick);
	//testing call
	// $('table').on('.entry tr', 'click', onRowClick);
	function onSearchButtonClick() {
		// 1. Input value
		console.log("Search: " + $('#chat-box').val());
		//$('.submit').val();
		// $('#results').html($('#search-box').val());
		// var now = timeStamp();
		var now = timeStamp();

		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/austintime',
			{
				message: $('#chat-box').val(),
				name: 'Gabe',
				time: now
			},
			function(message) {
				console.log(message);
				// $('textarea').html('');
				render(message);
			},
			'json'
		);
		$('#chat-box').html('');
	}
	
	var getMessages = function() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/austintime',
			function(messages) {
				render(messages);
			},
			'json'
		);
	};

	var render = function(messages) {
		var messageRow = _.template('<br><div class="row"><div><strong><%= name %></strong></div><div><%= message %></div><div><%= time %></div></div>');
		console.log(messages);
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			if(messages[i].message && messages[i].name && messages[i].time) {
				$('#message-board').append(messageRow(messages[i]) );
			}
		}
	};

	
	// var now = timeStamp();
	// var firstPass = 1;

	setInterval( getMessages, 1000);


	function timeStamp() {
	// Create a date object with the current time
	  var now = new Date();
	 
	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
	 
	// Create an array with the current hour, minute and second
	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	 
	// Determine AM or PM suffix based on the hour
	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
	 
	// Convert hour from military time
	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
	 
	// If hour is 0, set it to 12
	  time[0] = time[0] || 12;
	 
	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {
	    if ( time[i] < 10 ) {
	      time[i] = "0" + time[i];
	    }
	  }
	 
	// Return the formatted string
	  return date.join("/") + " " + time.join(":") + " " + suffix;
	}
});



