import {
  Engine,
  FreeCamera,
  HemisphericLight,
  KeyboardEventTypes,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core"
import { useEffect, useRef, useState } from "react"

import CreateWalls from "../components/CreateWalls"
import CreateRoom from "../components/CreateRoom"
import CreateObjects from "../components/CreateObjects"

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine>(null)

  const [cameraLock, SetCameraLock] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current

    const engine = new Engine(canvas, true)
    engineRef.current = engine

    const scene = new Scene(engine)

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 5, 0),
      scene
    )

    CreateController(scene)
    CreateEnvironment(scene)

    engine.runRenderLoop(() => {
      scene.render()
    })

    const onResize = () => engine.resize()
    window.addEventListener("resize", onResize)

    const gravity = -8
    const fps = 60

    scene.gravity = new Vector3(0, gravity / fps, 0)
    scene.collisionsEnabled = true
    scene.onPointerDown = (evt) => {
      if (evt.button === 2) {
        SetCameraLock((prevState) => !prevState)
      }
    }

    //Cleanup
    return () => {
      window.removeEventListener("resize", onResize)
      try {
        engine.stopRenderLoop()
      } catch {}
      try {
        scene.dispose()
      } catch {}
      try {
        engine.dispose()
      } catch {}
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    const engine = engineRef.current
    if (!engine) return
    cameraLock ? engine.enterPointerlock() : engine.exitPointerlock()
  }, [cameraLock])

  return (
    <div className="w-4/5 h-4/5 relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <img
        src="/image/arm_knife.png"
        alt=""
        className="absolute bottom-0 left-1/5 pointer-events-none"
      />
    </div>
  )
}

function CreateController(scene: Scene): void {
  const camera = new FreeCamera("camera", new Vector3(0, 5, 0), scene)
  camera.attachControl()
  camera.speed = 0.5

  camera.ellipsoid = new Vector3(1, 2.5, 1)

  camera.applyGravity = true
  camera.checkCollisions = true

  camera.minZ = 0.5
  camera.speed = 0.65
  camera.angularSensibility = 6000

  camera.keysUp.push(87)
  camera.keysLeft.push(65)
  camera.keysDown.push(83)
  camera.keysRight.push(68)

  let isJumping = false
  const jumpForce = 1.25

  camera.onCollide = () => {
    isJumping = false
  }

  camera.getScene().onKeyboardObservable.add((evt) => {
    if (evt.type === KeyboardEventTypes.KEYDOWN) {
      if (evt.event.code === "Space") {
        if (!isJumping) {
          camera.cameraDirection.y += jumpForce
          isJumping = true
        }
      }
    }
  })
}

function CreateEnvironment(scene: Scene): void {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    scene
  )

  ground.material = CreateGroundMaterial(scene)
  ground.checkCollisions = true

  CreateWalls(scene)
  CreateRoom(scene)
  CreateObjects(scene)
}

function CreateGroundMaterial(scene: Scene): PBRMaterial {
  const pbr = new PBRMaterial("groundMat", scene)

  pbr.roughness = 1

  pbr.albedoTexture = new Texture(
    "/texture/ground/concrete_floor_diff.jpg",
    scene
  )

  pbr.bumpTexture = new Texture("/texture/ground/concrete_floor_nor.jpg", scene)

  pbr.useAmbientOcclusionFromMetallicTextureRed = true
  pbr.useRoughnessFromMetallicTextureGreen = true
  pbr.useMetallnessFromMetallicTextureBlue = true

  pbr.metallicTexture = new Texture(
    "/texture/ground/concrete_floor_arm.jpg",
    scene
  )

  return pbr
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
