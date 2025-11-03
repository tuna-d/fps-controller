import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core"
import { useEffect, useRef } from "react"

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine>(null)

  useEffect(() => {
    const canvas = canvasRef.current!

    const engine = new Engine(canvas, true)
    engineRef.current = engine

    const scene = new Scene(engine)

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 10, 0),
      scene
    )

    CreateController(scene)
    CreateEnvironment(scene)

    engine.runRenderLoop(() => {
      scene.render()
    })

    const onResize = () => engine.resize()
    window.addEventListener("resize", onResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize)
      // Dispose scene & engine to prevent memory leaks on hot reload/unmount
      scene.dispose()
      engine.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-4/5 h-4/5" />
}

function CreateController(scene: Scene): void {
  const camera = new FreeCamera("camera", new Vector3(-20, 10, -20), scene)
  camera.attachControl()
}

function CreateEnvironment(scene: Scene): void {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 30 },
    scene
  )
}
