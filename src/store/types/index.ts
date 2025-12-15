import type { RouletteOption } from "roulette/types";
import { type VideoKeys } from "animatedBackground/types";

export interface Config {
	id: string;
	prizes: Omit<RouletteOption, "type">[];
	challenges: Omit<RouletteOption, "type">[];
	animatedBackground: Record<VideoKeys, string>;
	miss_attempt: number;
	retry_attempt: number;
	delayTime: number;
	shuffle: ("challenges" | "prizes")[];
	colors:
		| {
				prize: string;
				challenge: string;
				miss: string;
				retry: string;
				border: string;
		  }
		| Record<string, never>;
	gameOverTitle: string;
	gameOverMessage?: string;
	options: RouletteOption[];
}

export interface StoreState {
	config: Config | null;
	loading: boolean;
	error: string | null;
}

export type StoreAction =
	| { type: "SET_CONFIG"; payload: Config }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_ERROR"; payload: string }
	| { type: "UPDATE_CONFIG"; payload: Partial<Config> }
	| { type: "DELETE_CONFIG" };
