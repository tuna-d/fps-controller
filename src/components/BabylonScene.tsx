import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core"
import { useEffect, useRef } from "react"

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

function CreateWalls(scene: Scene): void {
  const wall1 = MeshBuilder.CreatePlane(
    "wall1",
    {
      height: 10,
      width: 50,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  wall1.position = new Vector3(0, 5, 25)

  const wall2 = MeshBuilder.CreatePlane(
    "wall2",
    {
      height: 10,
      width: 50,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  wall2.position = new Vector3(25, 5, 0)
  wall2.rotation = new Vector3(0, Math.PI / 2, 0)

  const wall3 = MeshBuilder.CreatePlane(
    "wall3",
    {
      height: 10,
      width: 50,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  wall3.position = new Vector3(-25, 5, 0)
  wall3.rotation = new Vector3(0, -Math.PI / 2, 0)

  const wall4 = MeshBuilder.CreatePlane(
    "wall4",
    {
      height: 10,
      width: 50,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  wall4.position = new Vector3(0, 5, -25)

  wall1.material = CreateWallMaterial(scene)
  wall2.material = CreateWallMaterial(scene)
  wall3.material = CreateWallMaterial(scene)
  wall4.material = CreateWallMaterial(scene)
}

function CreateWallMaterial(scene: Scene): PBRMaterial {
  const pbr = new PBRMaterial("groundMat", scene)

  //const uvScale = 5
  const texArray: Texture[] = []

  pbr.roughness = 1

  const albedoTex = new Texture("/texture/wall/rock_wall_diff.jpg", scene)
  pbr.albedoTexture = albedoTex

  texArray.push(albedoTex)

  const bumpTex = new Texture("/texture/wall/rock_wall_nor.jpg", scene)
  pbr.bumpTexture = bumpTex

  texArray.push(bumpTex)

  pbr.useAmbientOcclusionFromMetallicTextureRed = true
  pbr.useRoughnessFromMetallicTextureGreen = true
  pbr.useMetallnessFromMetallicTextureBlue = true

  const metallicTex = new Texture("/texture/wall/rock_wall_arm.jpg", scene)
  pbr.metallicTexture = metallicTex

  texArray.push(metallicTex)

  texArray.map((tex) => {
    tex.uScale = 5
    tex.vScale = 3
  })

  return pbr
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
