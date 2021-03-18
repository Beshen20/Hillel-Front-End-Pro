window.onload = function () {
  const socket = new WebSocket("wss://fep-app.herokuapp.com/");
  const status = document.querySelector("#status");
  const history = document.querySelector("#history");

  socket.onopen = function () {
    status.innerHTML = "cоединение установлено<br>";
    status.style.color = 'green';
  };

  socket.onclose = function (event) {

    if (event.wasClean) {
      status.innerHTML = 'cоединение закрыто';
    } else {
      status.innerHTML = 'соединения как-то закрыто';
    }
    status.innerHTML += `<br>код: ${event.code ? event.code : 'не указан'}, причина: ${event.reason ? event.reason : 'не указана'}`;
    status.style.color = 'red';

  };

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    history.innerHTML += `<div class='w-100 mb-10'><b>${message.name}</b>: ${message.msg.split('\n').join('<br>')}</div>`;
  };

  socket.onerror = function (event) {
    status.innerHTML = "ошибка " + event.message;
    status.style.color = 'red';
  };

  document.forms["message-send"].onsubmit = function () {
    const message = {
      name: this.fname.value,
      msg: this.msg.value
    };
    socket.send(JSON.stringify(message));
    this.msg.value = '';
    return false;
  };

};