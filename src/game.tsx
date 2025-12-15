import React, { useState, useEffect, useCallback } from "react";
import { useStore } from "./store";
import { useRoulette, Roulette } from "./roulette";
import { ButtonIcon, ButtonSpin, Modal } from "./gui";

import forcePriceIcon from "assets/icons/prize.svg";
import forceChallengeIcon from "assets/icons/challenge.svg";
import forceEndIcon from "assets/icons/exit.svg";
import menuIcon from "assets/icons/menu.svg";
import closeMenu from "assets/icons/close.svg";

interface GameProps {
	toggleHold: () => void;
}

const Game: React.FC<GameProps> = ({ toggleHold }) => {
	const { config } = useStore();
	const {
		isSpinning,
		result,
		spin,
		gameOver,
		removeOption,
		clearPrevResult,
		forcePrize,
		forceChallenge,
		forceEnd,
		options,
	} = useRoulette();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [windowSize, setWindowSize] = useState(400);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleModalClose = useCallback(() => {
		if (result) removeOption(result?.id || "");
		clearPrevResult();
		setIsModalOpen(false);
	}, [clearPrevResult, removeOption, result]);

	const openMenuHandler = () => {
		setMenuOpen(!menuOpen);
	};

	const btnHandler = (action: string) => {
		switch (action) {
			case "forcePrize":
				forcePrize();
				break;
			case "forceChallenge":
				forceChallenge();
				break;
			case "forceEnd":
				forceEnd();
				break;
		}
		setMenuOpen(false);
	};

	// Escuchar eventos personalizados

	useEffect(() => {
		if (!options.length) forceEnd();
	}, [options, forceEnd]);

	useEffect(() => {
		const handleWindowResize = () => {
			const size =
				window.innerWidth > window.innerHeight
					? window.innerHeight
					: window.innerWidth;

			setWindowSize(size * 0.8);
		};

		window.addEventListener("resize", handleWindowResize as EventListener);

		handleWindowResize();
		return () => {
			window.removeEventListener("resize", handleWindowResize as EventListener);
		};
	}, []);

	useEffect(() => {
		if (result && !isSpinning) setIsModalOpen(true);
	}, [result, isSpinning]);

	return (
		<>
			<div className="container mx-auto my-auto">
				<div className="main-wrapper flex justify-center items-center mx-auto my-auto">
					<div className="roulette-container">
						<Roulette
							onSpinEnd={(result) => console.log("Ganador:", result)}
							colorOptions={config?.colors || {}}
							size={Math.min(750, windowSize)}
						/>
						<div className="spin__control--wrapper">
							<ButtonSpin
								onClick={spin}
								size={Math.min(220, windowSize * 0.375)}
								disabled={isSpinning}
							/>
						</div>
					</div>
				</div>

				<div className="controls-menu flex flex-col absolute top-0 right-0">
					<ButtonIcon
						onClick={openMenuHandler}
						disabled={isSpinning || gameOver}>
						<img
							src={menuOpen ? closeMenu : menuIcon}
							alt="menu"
							width={32}
							height={32}
						/>
					</ButtonIcon>
					<div
						className={`controls flex flex-col gap-1 ${
							menuOpen ? "open" : ""
						}`}>
						<ButtonIcon
							onClick={() => btnHandler("forcePrize")}
							disabled={isSpinning || gameOver}>
							<img
								src={forcePriceIcon}
								alt="Forzar premio"
								width={32}
								height={32}
							/>
						</ButtonIcon>

						<ButtonIcon
							onClick={() => btnHandler("forceChallenge")}
							variant="secondary"
							disabled={isSpinning || gameOver}>
							<img
								src={forceChallengeIcon}
								alt="Forzar Desafío"
								width={32}
								height={32}
							/>
						</ButtonIcon>

						<ButtonIcon
							onClick={() => btnHandler("forceEnd")}
							variant="danger"
							disabled={gameOver}>
							<img
								src={forceEndIcon}
								alt="Terminar Juego"
								width={32}
								height={32}
							/>
						</ButtonIcon>
					</div>
				</div>
				<div className="absolute top-0 left-0">
					<ButtonIcon onClick={toggleHold} disabled={isSpinning}>
						<img
							src={forcePriceIcon}
							alt="Forzar premio"
							width={32}
							height={32}
						/>
					</ButtonIcon>
				</div>

				<Modal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					title={result?.label}
					text={result?.description}
					type={result?.type ?? "miss"}
					size={"medium"}
				/>
			</div>
		</>
	);
};

export default Game;
