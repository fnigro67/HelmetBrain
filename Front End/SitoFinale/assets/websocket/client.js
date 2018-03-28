//var clientSocket = new WebSocket("ws://www.example.com/socketserver", "protocolOne");

class connector{
  constructor(nameSocket){
    this.socketClient = new WebSocket(nameSocket, "protocolOne");

  }

  // Getter
  get clientSocketInfo(){
    return this.GetclientSocketInfo();
  }
  // Method
  GetclientSocketInfo(){
    return this.socketClient;
  }

  transmitData(message){
    this.socketClient.onopen = function (event) {
      this.socketClient.send(message);
    };
  }

  transmitComplexData(msg) {

    ///ESEMPIO DI MESSAGGIO
    //msg = {
    //  type: "message",
    //  text: document.getElementById("text").value,
    //  id:   clientID,
    //  date: Date.now()
    //};

    // Invia l'oggetto msg formattato come una stringa JSON.
  this.socketClient.send(JSON.stringify(msg));


}

  CloseConnection(){
    this.socketClient.close();
  }

  Callback()
  {
      this.socketClient.onmessage = function(event)
      {

      var text = "";
      var msg = JSON.parse(event.data); //esempi
      var time = new Date(msg.date);
      var timeStr = time.toLocaleTimeString();

      switch(msg.type)
         {
           case "id":
              clientID = msg.id;

              break;

          }

      }


    }

}



const serverReceiver = new connector("ws://www.example.com/socketserver");

console.log(serverReceiver.clientSocketInfo); // 100
