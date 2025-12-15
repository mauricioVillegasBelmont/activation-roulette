import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import { useRoulette } from "./roulette";

import { AnimatedBackground, VideoProvider } from "./animatedBackground";
import Game from "./game";
import Hold from "./hold";

import "assets/css/App.css";
import "animate.css";
import ruleta_activacion from "assets/ruleta_activacion.svg";

const App: React.FC = () => {
	const { config, loading, error } = useStore();
	const { isSpinning, gameOver } = useRoulette();

	const [bgVariant, setBgVariant] = useState<"spin" | "hold" | "end" | "stage">(
		"hold"
	);
	const [holdState, setHoldState] = useState<boolean>(true);

	const holdStateHandler = () => {
		setHoldState((prev) => !prev);
	};

	useEffect(() => {
		// "spin" | "hold" | "end" | "stage"
		if (holdState) {
			setBgVariant("hold");
		} else {
			if (isSpinning) {
				setBgVariant("spin");
				return;
			}
			if (gameOver) {
				setBgVariant("end");
				return;
			}
			setBgVariant("stage");
		}
	}, [isSpinning, gameOver, holdState]);

	if (loading) {
		return (
			<div className="app-container h-screen w-100 flex justify-center align-middle">
				<h1>Cargando configuración...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="app-container h-screen w-100 flex justify-center align-middle">
				<h1>Error: {error}</h1>
			</div>
		);
	}

	if (!config) {
		return (
			<div className="app-container h-screen w-100 flex justify-center align-middle">
				<h1>No se encontró la configuración</h1>
			</div>
		);
	}

	return (
		<VideoProvider>
			<AnimatedBackground variant={bgVariant}>
				<div className="app relative h-screen flex flex-col justify-center items-center">
					<h1 className="app-title  py-5" aria-labelledby="Ruleta de Premios">
						<img
							src={ruleta_activacion}
							alt="Ruleta de Premios"
							className="w-full"
						/>
					</h1>
					{holdState ? (
						<Hold toggleHold={holdStateHandler} />
					) : gameOver ? (
						<>
							<p className="gameover-title">{config.gameOverTitle}</p>
							{config.gameOverMessage ? (
								<p className="gameover-message">{config.gameOverMessage}</p>
							) : (
								""
							)}
						</>
					) : (
						<Game toggleHold={holdStateHandler} />
					)}
				</div>
			</AnimatedBackground>
		</VideoProvider>
	);
};

export default App;
