import {
  ImportMeshAsync,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core"
import "@babylonjs/loaders"

export default function CreateRoom(scene: Scene): void {
  const roomWall1 = MeshBuilder.CreatePlane(
    "roomWall1",
    {
      height: 10,
      width: 20,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  roomWall1.position = new Vector3(5, 5, 15)
  roomWall1.rotation = new Vector3(0, Math.PI / 2, 0)

  const roomRoof = MeshBuilder.CreatePlane(
    "roomRoof",
    {
      height: 20,
      width: 20,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  roomRoof.rotation = new Vector3(Math.PI / 2, 0, 0)
  roomRoof.position = new Vector3(15, 10, 15)

  const roomWall2 = MeshBuilder.CreatePlane(
    "roomWall2",
    {
      height: 10,
      width: 4.9,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  roomWall2.position = new Vector3(7.42, 5, 5)

  const roomWall3 = MeshBuilder.CreatePlane(
    "roomWall3",
    {
      height: 10,
      width: 10.8,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  roomWall3.position = new Vector3(19.55, 5, 5)

  const roomWall4 = MeshBuilder.CreatePlane(
    "roomWall4",
    {
      height: 2.6,
      width: 4.3,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  )

  roomWall4.position = new Vector3(12, 8.7, 5)

  const walls = [roomWall1, roomWall2, roomWall3, roomWall4, roomRoof]

  walls.map((wall) => {
    wall.material = CreateWallMaterial(scene)
  })

  CreateDoorModel(scene)
}

async function CreateDoorModel(scene: Scene): Promise<void> {
  const model = await ImportMeshAsync("/model/door.glb", scene)
  const root = model.meshes[0]

  root.scaling = new Vector3(3, 3, 3)
  root.position = new Vector3(12, 0, 5)
}

function CreateWallMaterial(scene: Scene): PBRMaterial {
  const pbr = new PBRMaterial("groundMat", scene)

  const texArray: Texture[] = []

  pbr.roughness = 1

  const albedoTex = new Texture(
    "/texture/room-wall/metal_plate_diff.jpg",
    scene
  )
  pbr.albedoTexture = albedoTex

  texArray.push(albedoTex)

  const bumpTex = new Texture("/texture/room-wall/metal_plate_nor.jpg", scene)
  pbr.bumpTexture = bumpTex

  texArray.push(bumpTex)

  pbr.useAmbientOcclusionFromMetallicTextureRed = true
  pbr.useRoughnessFromMetallicTextureGreen = true
  pbr.useMetallnessFromMetallicTextureBlue = true

  const metallicTex = new Texture(
    "/texture/room-wall/metal_plate_arm.jpg",
    scene
  )
  pbr.metallicTexture = metallicTex

  texArray.push(metallicTex)

  texArray.map((tex) => {
    tex.uScale = 5
    tex.vScale = 5
  })

  return pbr
}
