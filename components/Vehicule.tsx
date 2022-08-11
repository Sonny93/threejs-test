// SOURCE: https://github.com/pmndrs/use-cannon/tree/master/packages/react-three-cannon-examples/src/demos/RaycastVehicle

import { useEffect, useRef } from 'react';

import type { Group, Mesh } from 'three'
import { useFrame } from '@react-three/fiber';

import type { BoxProps, WheelInfoOptions } from '@react-three/cannon';
import { useBox, useRaycastVehicle } from '@react-three/cannon';

import { Chassis } from './Chassis';
import { useControls } from './use-controls';
import { Wheel } from './Wheel';

export type VehicleProps = Required<Pick<BoxProps, 'angularVelocity' | 'position' | 'rotation'>> & {
    back?: number;
    force?: number;
    front?: number;
    height?: number;
    maxBrake?: number;
    radius?: number;
    steer?: number;
    width?: number;
    turboForce?: number;
}

function Vehicle({
    angularVelocity,
    back = -1.15,
    force = 2000,
    front = 1.3,
    height = -0.04,
    maxBrake = 50,
    position,
    radius = 0.7,
    rotation,
    steer = 0.5,
    width = 1.2,
    turboForce = 2
}: VehicleProps) {
    const wheels = [useRef<Group>(null), useRef<Group>(null), useRef<Group>(null), useRef<Group>(null)];
    const controls = useControls();

    const wheelInfo: WheelInfoOptions = {
        axleLocal: [-1, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
        customSlidingRotationalSpeed: -30,
        dampingCompression: 4.4,
        dampingRelaxation: 10,
        directionLocal: [0, -1, 0], // set to same as Physics Gravity
        frictionSlip: 2,
        maxSuspensionForce: 1e4,
        maxSuspensionTravel: 0.3,
        radius,
        suspensionRestLength: 0.3,
        suspensionStiffness: 30,
        useCustomSlidingRotationalSpeed: true,
    }

    const wheelInfo1: WheelInfoOptions = {
        ...wheelInfo,
        chassisConnectionPointLocal: [-width / 2, height, front],
        isFrontWheel: true,
    }
    const wheelInfo2: WheelInfoOptions = {
        ...wheelInfo,
        chassisConnectionPointLocal: [width / 2, height, front],
        isFrontWheel: true,
    }
    const wheelInfo3: WheelInfoOptions = {
        ...wheelInfo,
        chassisConnectionPointLocal: [-width / 2, height, back],
        isFrontWheel: false,
    }
    const wheelInfo4: WheelInfoOptions = {
        ...wheelInfo,
        chassisConnectionPointLocal: [width / 2, height, back],
        isFrontWheel: false,
    }

    const [chassisBody, chassisApi] = useBox(
        () => ({
            allowSleep: false,
            angularVelocity,
            args: [1.7, 1, 4],
            mass: 500,
            onCollide: (e) => console.log('bonk', e.body.userData),
            position,
            rotation,
        }),
        useRef<Mesh>(null)
    );

    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
            wheels,
        }),
        useRef<Group>(null)
    );

    useFrame(() => {
        const { backward, brake, forward, left, reset, turbo, right, jump } = controls.current;
        const forceWithTurbo = turbo ? turboForce * force : force;

        for (let e = 2; e < 4; e++) {
            vehicleApi.applyEngineForce(forward || backward ? forceWithTurbo * (forward && !backward ? -1 : 1) : 0, 2)
        }

        for (let s = 0; s < 2; s++) {
            vehicleApi.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s)
        }

        for (let b = 2; b < 4; b++) {
            vehicleApi.setBrake(brake ? maxBrake : 0, b)
        }

        if (jump) {
            chassisApi.velocity.set(0, 100, 0)
        }

        if (reset) {
            chassisApi.position.set(...position)
            chassisApi.velocity.set(0, 0, 0)
            chassisApi.angularVelocity.set(...angularVelocity)
            chassisApi.rotation.set(...rotation)
        }
    });

    return (
        <group ref={vehicle} position={[0, -0.4, 0]}>
            <Chassis ref={chassisBody} />
            <Wheel ref={wheels[0]} radius={radius} leftSide />
            <Wheel ref={wheels[1]} radius={radius} />
            <Wheel ref={wheels[2]} radius={radius} leftSide />
            <Wheel ref={wheels[3]} radius={radius} />
        </group>
    );
}

export default Vehicle