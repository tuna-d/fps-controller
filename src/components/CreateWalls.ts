import {
  Mesh,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core"

export default function CreateWalls(scene: Scene): void {
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
