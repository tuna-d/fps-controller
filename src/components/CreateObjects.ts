import { ImportMeshAsync, MeshBuilder, Scene, Vector3 } from "@babylonjs/core"
import "@babylonjs/loaders"

export default function CreateObjects(scene: Scene) {
  BoxModel(scene, new Vector3(-10, 0, 10), new Vector3(8, 8, 8))
  BoxModel(scene, new Vector3(15, 0, -18), new Vector3(8, 8, 8))
  SkateRampModel(scene)
  ElectricBoxModel(scene)
}

async function BoxModel(
  scene: Scene,
  position: Vector3 = new Vector3(0, 0, 0),
  scaling: Vector3 = new Vector3(1, 1, 1)
) {
  const model = await ImportMeshAsync("/model/wood_box.glb", scene)
  const root = model.meshes[0]

  root.position = position
  root.scaling = scaling

  const collider = MeshBuilder.CreateBox(
    "modelCollider",
    {
      width: 4,
      height: 8,
      depth: 4,
    },
    scene
  )
  collider.position = position
  collider.isVisible = false
  collider.checkCollisions = true
}

async function SkateRampModel(scene: Scene) {
  const model1 = await ImportMeshAsync("/model/skate_ramp.glb", scene)
  const root1 = model1.meshes[0]

  root1.position = new Vector3(6, 0, -10)
  root1.scaling = new Vector3(4, 4, 4)
  root1.rotation = new Vector3(0, Math.PI / 2, 0)

  const colliderPlane1 = MeshBuilder.CreatePlane(
    "colliderPlane1",
    { width: 10, height: 8 },
    scene
  )

  colliderPlane1.position = new Vector3(8, 1, -10)
  colliderPlane1.rotation = new Vector3(Math.PI / 3, -Math.PI / 2, 0)
  colliderPlane1.checkCollisions = true
  colliderPlane1.isVisible = false

  const colliderBox1 = MeshBuilder.CreateBox(
    "colliderBox1",
    { width: 2, height: 3, depth: 9 },
    scene
  )
  colliderBox1.position = new Vector3(4, 1, -10)
  colliderBox1.checkCollisions = true
  colliderBox1.isVisible = false

  const model2 = await ImportMeshAsync("/model/skate_ramp.glb", scene)
  const root2 = model2.meshes[0]

  root2.position = new Vector3(-6, 0, -10)
  root2.scaling = new Vector3(4, 4, 4)
  root2.rotation = new Vector3(0, -Math.PI / 2, 0)

  const colliderPlane2 = MeshBuilder.CreatePlane(
    "colliderPlane2",
    { width: 10, height: 8 },
    scene
  )

  colliderPlane2.position = new Vector3(-8, 1, -10)
  colliderPlane2.rotation = new Vector3(Math.PI / 3, Math.PI / 2, 0)
  colliderPlane2.checkCollisions = true
  colliderPlane2.isVisible = false

  const colliderBox2 = MeshBuilder.CreateBox(
    "colliderBox2",
    { width: 2, height: 3, depth: 9 },
    scene
  )
  colliderBox2.position = new Vector3(-4, 1, -10)
  colliderBox2.checkCollisions = true
  colliderBox2.isVisible = false
}

async function ElectricBoxModel(scene: Scene) {
  const model = await ImportMeshAsync("/model/electric_box.glb", scene)
  const root = model.meshes[0]

  root.position = new Vector3(-18, 0, -2)
  root.scaling = new Vector3(8, 8, 8)
  root.rotation = new Vector3(0, Math.PI / 2, 0)

  const collider = MeshBuilder.CreateBox(
    "modelCollider",
    {
      width: 3,
      height: 5.5,
      depth: 5,
    },
    scene
  )
  collider.position = new Vector3(-18, 4, -2)
  collider.isVisible = false
  collider.checkCollisions = true
}
