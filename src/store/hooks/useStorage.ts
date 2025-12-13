import type { Config } from "store/types";

const normalizeConfig = (config: Partial<Config>): Config => {
	const defaultValue = {
		id: "test",
		passwords: {
			forcePrice: "test",
			forceChallenge: "test",
			forceEnd: "test",
		},
		prizes: [],
		challenges: [],
		shuffle: [],
		animatedBackground: {
			hold: "./video/hold.webm",
			spin: "./video/spin.mp4",
			end: "./video/end.webm",
			stage: "./video/stage.webm",
		},
		miss_attempt: 0,
		retry_attempt: 0,
		delayTime: 1000,
		colors: {},
		options: [],
	};
	return { ...defaultValue, ...config };
};

const useStorage = () => {
	const getConfigKey = (id: string) => `app_key--${id}`;

	const loadConfig = async (id: string): Promise<Config | null> => {
		try {
			// Verificar localStorage
			const storedConfig = localStorage.getItem(getConfigKey(id));
			if (storedConfig) {
				return JSON.parse(storedConfig);
			}

			// Si no existe en localStorage, obtener desde public
			const response = await fetch(`/${id}.json`);
			if (!response.ok) {
				throw new Error(`Failed to load config for ${id}`);
			}

			const loadedConfig: Partial<Config> = await response.json();
			const config: Config = normalizeConfig(loadedConfig);

			// Guardar en loc alStorage
			// localStorage.setItem(getConfigKey(id), JSON.stringify(config));

			return config;
		} catch (error) {
			console.error("Error loading config:", error);
			return null;
		}
	};

	const updateConfig = (id: string, config: Partial<Config>) => {
		const key = getConfigKey(id);
		const storedConfig = localStorage.getItem(key);

		if (storedConfig) {
			const parsedConfig: Config = JSON.parse(storedConfig);
			const updatedConfig = { ...parsedConfig, ...config };
			localStorage.setItem(key, JSON.stringify(updatedConfig));
			return updatedConfig;
		}

		return null;
	};

	const deleteConfig = (id: string) => {
		localStorage.removeItem(getConfigKey(id));
	};

	return {
		loadConfig,
		updateConfig,
		deleteConfig,
	};
};

export default useStorage;
