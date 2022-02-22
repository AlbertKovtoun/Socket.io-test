import * as THREE from "three"
import { scene } from "./Experience"

export class Donut {
  constructor() {
    // this.setDonut()
    // setInterval(() => {
    //   this.moveDonut()
    // }, 1000 / 2)
  }

  setDonut() {
    this.donut = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 20, 40),
      new THREE.MeshBasicMaterial({ color: "white", wireframe: true })
    )
    this.donut.rotation.y = Math.random()
    scene.add(this.donut)
  }

  moveDonut() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "w") {
        this.donut.position.y += 0.01
      }
      if (e.key === "d") {
        this.donut.position.x += 0.01
      }
      if (e.key === "s") {
        this.donut.position.y -= 0.01
      }
      if(e.key === "a"){
        this.donut.position.x -= 0.01
      }
    })
  }
}
