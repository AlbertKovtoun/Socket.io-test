const http = require("http").createServer()

const io = require("socket.io")(http, {
  cors: { origin: "*" },
})

class ConnectedUser {
  constructor(socket) {
    this.position = [Math.random() * 6 - 3, Math.random() * 6 - 3, 0]
    this.socket = socket

    this.socket.emit("position", this.position)

    for (let i = 0; i < clients.length; i++) {
      clients[i].socket.emit("position", this.position)
      this.socket.emit("position", clients[i].position)
    }

    // this.socket.on("updatedPosition", (_position) => {
      
    //   // this.socket.emit("updatedPosition", _position)

    //   for (let i = 0; i < clients.length; i++) {
    //     console.log(_position)

    //     clients[i].socket.emit("updatedPosition", _position)
    //     this.socket.emit("updatedPosition", clients[i].position)
    //   }
    // })
  }
}

let clients = []

io.on("connection", (socket) => {
  console.log(`New user connected with id ${socket.id}`)
  console.log(`Total users: ${io.engine.clientsCount}`)

  clients.push(new ConnectedUser(socket))
})

http.listen(8080, () => console.log("listening on http://localhost:8080"))
