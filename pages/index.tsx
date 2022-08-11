import { useState } from 'react';
import type { NextPage } from 'next';

import { Canvas, useFrame } from '@react-three/fiber';

import { PointerLockControls, Stars } from '@react-three/drei';
import { useBox, Physics, usePlane } from '@react-three/cannon';

import styles from '../styles/Home.module.css';
import Vehicle from '../components/Vehicule';

const Home: NextPage = () => {
	const [show, setShow] = useState<boolean>(false);
	const items = new Array(50).fill(0);
	const offsetY = 5;
	const stepY = .01;
	const spaceX = .1;

	if (!show) {
		return (<button onClick={() => setShow(props => !props)}>
			click
		</button>)
	}

	return (
		<div className={styles.container}>
			<Canvas onLoad={() => console.log('a')}>
				<ambientLight intensity={.5} />
				<PointerLockControls
					position={[0, 50, 0]}
					rotation={[0, 45, 0]}
				/>
				<Stars />
				<Physics>
					<Plane />
					<Vehicle
						position={[0, 2, 0]}
						rotation={[0, -Math.PI / 4, 0]}
						angularVelocity={[0, .5, 0]}
						force={2500}
					/>
					{items.map((_, index, { length }) => (
						<Box
							key={index}
							index={index}
							position={[
								index + (index * spaceX) - ((length / 2)), // x
								offsetY + (index * stepY), // y
								15 // z
							]}
						/>
					))}
				</Physics>
			</Canvas>
		</div>
	)
}

function Box({ position, index }: { position: [number, number, number]; index: number; }) {
	const [ref, api,] = useBox(() => ({ mass: 50, position }));

	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	useFrame(() => ((ref as any).current.rotation.x += 0.01));

	// useEffect(() => {
	// 	api.velocity.subscribe(([x, y, z]) => {
	// 		if (Math.round(y) === 0) {
	// 			api.velocity.set(0, 10, 0);
	// 		}
	// 	});
	// }, [api, index]);

	function handleClick() {
		setActive(!active);
		api.velocity.set(0, 10, 0);
	}

	return (
		<mesh
			ref={ref as any}
			scale={active ? 1.5 : 1}
			onClick={handleClick}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

function Plane() {
	const [ref] = usePlane(() => ({ position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0] }));
	return (
		<mesh ref={ref as any}>
			<planeGeometry args={[100, 100]} />
			<meshStandardMaterial color={'lightblue'} />
		</mesh>
	);
}

export default Home;
