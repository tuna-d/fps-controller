import { ImportMeshAsync, Scene, Vector3 } from "@babylonjs/core"
import "@babylonjs/loaders"

export default function CreateObjects(scene: Scene) {
  BoxModel(scene, new Vector3(-10, 0, 10), new Vector3(8, 8, 8))
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
}

async function SkateRampModel(scene: Scene) {
  const model1 = await ImportMeshAsync("/model/skate_ramp.glb", scene)
  const root1 = model1.meshes[0]

  root1.position = new Vector3(6, 0, -10)
  root1.scaling = new Vector3(4, 4, 4)
  root1.rotation = new Vector3(0, Math.PI / 2, 0)

  const model2 = await ImportMeshAsync("/model/skate_ramp.glb", scene)
  const root2 = model2.meshes[0]

  root2.position = new Vector3(-6, 0, -10)
  root2.scaling = new Vector3(4, 4, 4)
  root2.rotation = new Vector3(0, -Math.PI / 2, 0)
}

async function ElectricBoxModel(scene: Scene) {
  const model = await ImportMeshAsync("/model/electric_box.glb", scene)
  const root = model.meshes[0]

  root.position = new Vector3(-20, 0, -2)
  root.scaling = new Vector3(8, 8, 8)
}
