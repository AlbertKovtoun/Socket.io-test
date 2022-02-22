import * as THREE from "three"
import { io } from "socket.io-client"

import { Camera } from "./Camera"
import { Donut } from "./Donut"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"

export let canvas, scene, donut, sizes, camera, renderer

const socket = io("ws://localhost:8080")

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector(".webgl")

  scene = new THREE.Scene()

  donut = new Donut()

  const al = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(al)

  const pl = new THREE.PointLight(0xffffff, 1)
  pl.position.set(0, 1, 5)
  scene.add(pl)

  sizes = new Sizes()

  camera = new Camera()

  renderer = new Renderer()

  let box

  window.addEventListener("keydown", (e) => {
    if (e.key === "w") {
      box.position.y += 0.01
    }
    if (e.key === "d") {
      box.position.x += 0.01
    }
    if (e.key === "s") {
      box.position.y -= 0.01
    }
    if (e.key === "a") {
      box.position.x -= 0.01
    }

    socket.emit("position", box.position.toArray())
  })

  socket.on("position", (_position) => {
    box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: "pink" })
    )
    box.position.set(..._position)
    scene.add(box)
  })

  //Animate
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    camera.controls.update()

    // Render
    renderer.renderer.render(scene, camera.camera)

    window.requestAnimationFrame(tick)
  }

  tick()
})
