import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core"
import { useEffect, useRef } from "react"

import CreateWalls from "../components/CreateWalls"
import CreateRoom from "../components/CreateRoom"

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine>(null)

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

  return <canvas ref={canvasRef} className="w-4/5 h-4/5" />
}

function CreateController(scene: Scene): void {
  const camera = new FreeCamera("camera", new Vector3(0, 20, -35), scene)
  camera.attachControl()
  camera.speed = 0.5
}

function CreateEnvironment(scene: Scene): void {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    scene
  )

  ground.material = CreateGroundMaterial(scene)

  CreateWalls(scene)
  CreateRoom(scene)
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
