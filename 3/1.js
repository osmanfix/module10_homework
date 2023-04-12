// https://yandex.ru/maps/?pt=30.335429,59.944869&z=18&l=map

const wsUrl= "wss://echo-ws-service.herokuapp.com";
document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded (){
  const infoOutput = document.querySelector(".info");
  const chatOutput = document.querySelector(".chat-win");
  const input = document.querySelector(".input-text");
  const sentBtn = document.querySelector(".input-submit");
  const btnGeo = document.querySelector(".input-geo");
  
  
  let socket = new WebSocket(wsUrl);
  socket.onmessage=(even)=>{
    writeToChat(even.data, true);
  }
  sentBtn.addEventListener("click", sendMessage);
  function sendMessage(){
    if(input.value ==="") return;
    socket.send(input.value)
    writeToChat(input.value, false);
    input.value="";
 }
  function writeToChat (message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "output serversms": "output sms" }"> ${message} </div>`
    chatOutput.innerHTML += messageHTML;
  }


  btnGeo.addEventListener("click", getLocation);
  
  
  function getLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
    } else {
      chatOutput.innerHTML +=`"Ваш браузер не поддерживает функцию определения местоположения`;
    }
  }
  
  function locationSuccess(data) {
    let link = `https://www.openstreetmap.org/#map=14/${data.coords.latitude}/${data.coords.longitude}`;
    chatOutput.innerHTML +=`<div class="output sms"> <a href="${link}" target="_blank">Я сейчас здесь</a></div>`;
  }
  
  function locationError() {
    chatOutput.innerHTML +=`<div class="output sms"> При получении местоположения произошла ошибка</div>`;
  }
}

