var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
var ReconnectingWebSocket = require('reconnecting-websocket');
var socket = new ReconnectingWebSocket('ws://' + window.location.host);

var connection = new sharedb.Connection(socket);
var programArea= document.getElementById('programArea');
var element = document.querySelector('textarea');
var statusSpan = document.getElementById('status-span');
var textbox = document.getElementById('textbox1');
statusSpan.innerHTML = 'Not Connected';
textbox.innerHTML = 'hi';
programArea.value="hi";
element.style.backgroundColor = 'gray';
socket.onopen = function() {
  statusSpan.innerHTML = 'Connected';
  element.style.backgroundColor = 'white';
};

socket.onclose = function() {
  statusSpan.innerHTML = 'Closed';
  element.style.backgroundColor = 'gray';
};

socket.onerror = function() {
  statusSpan.innerHTML = 'Error';
  element.style.backgroundColor = 'red';
};

// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', 'textarea');
doc.subscribe(function(err) {
  if (err) throw err;

  var binding = new StringBinding(programArea, doc, ['content']);
  binding.setup();

});

programArea.addEventListener('input',changeContent);

function changeContent(e)
{
	textbox.innerHTML=e.target.value;
}



