import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import type { Material, Mesh } from 'three'
import type { GLTF } from 'three-stdlib/loaders/GLTFLoader'

useGLTF.preload('/Beetle.glb')

// Initially Auto-generated by: https://github.com/pmndrs/gltfjsx
// Model via KrStolorz on Sketchfab, CC-BY-4.0
// https://sketchfab.com/3d-models/low-poly-volkswagen-beetle-f680ad7e98e445eaafed1a70f2c53911

const beetleMaterials = [
    'Black paint',
    'Black plastic',
    'Chrom',
    'Glass',
    'Headlight',
    'Interior (dark)',
    'Interior (light)',
    'License Plate',
    'Orange plastic',
    'Paint',
    'Reflector',
    'Reverse lights',
    'Rubber',
    'Steel',
    'Tail lights',
    'Underbody',
] as const
type BeetleMaterial = typeof beetleMaterials[number]

const beetleNodes = [
    'chassis_1',
    'chassis_2',
    'chassis_3',
    'chassis_4',
    'chassis_5',
    'chassis_6',
    'chassis_7',
    'chassis_8',
    'chassis_9',
    'chassis_10',
    'chassis_11',
    'chassis_12',
    'chassis_13',
    'chassis_14',
    'chassis_15',
    'chassis_16',
] as const
type BeetleNode = typeof beetleNodes[number]

type BeetleGLTF = GLTF & {
    materials: Record<BeetleMaterial, Material>
    nodes: Record<BeetleNode, Mesh>
}

// eslint-disable-next-line react/display-name
export const Chassis = forwardRef<Mesh>((_, ref) => {
    const { nodes, materials } = useGLTF('/Beetle.glb') as BeetleGLTF

    return (
        <mesh ref={ref}>
            <group position={[0, -0.6, 0]}>
                <mesh castShadow material={materials['Black paint']} geometry={nodes.chassis_1.geometry} />
                <mesh castShadow material={materials.Rubber} geometry={nodes.chassis_2.geometry} />
                <mesh castShadow material={materials.Paint} geometry={nodes.chassis_3.geometry} />
                <mesh castShadow material={materials.Underbody} geometry={nodes.chassis_4.geometry} />
                <mesh castShadow material={materials.Chrom} geometry={nodes.chassis_5.geometry} />
                <mesh castShadow material={materials['Interior (dark)']} geometry={nodes.chassis_6.geometry} />
                <mesh castShadow material={materials['Interior (light)']} geometry={nodes.chassis_7.geometry} />
                <mesh castShadow material={materials.Reflector} geometry={nodes.chassis_8.geometry} />
                <mesh
                    material={materials.Glass}
                    geometry={nodes.chassis_9.geometry}
                    material-transparent={false}
                    material-color="black"
                />
                <mesh castShadow material={materials.Steel} geometry={nodes.chassis_10.geometry} />
                <mesh castShadow material={materials['Black plastic']} geometry={nodes.chassis_11.geometry} />
                <mesh material={materials.Headlight} geometry={nodes.chassis_12.geometry} />
                <mesh castShadow material={materials['Reverse lights']} geometry={nodes.chassis_13.geometry} />
                <mesh castShadow material={materials['Orange plastic']} geometry={nodes.chassis_14.geometry} />
                <mesh castShadow material={materials['Tail lights']} geometry={nodes.chassis_15.geometry} />
                <mesh castShadow material={materials['License Plate']} geometry={nodes.chassis_16.geometry} />
            </group>
        </mesh>
    )
})