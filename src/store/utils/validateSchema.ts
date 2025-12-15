import type { Config } from "store/types";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

// Definir los schemas básicos primero
const passwordSchema = {
	type: "object",
	required: ["forcePrice", "forceChallenge", "forceEnd"],
	properties: {
		forcePrice: { type: "string" },
		forceChallenge: { type: "string" },
		forceEnd: { type: "string" },
	},
	additionalProperties: false,
};

const videoKeysSchema = {
	type: "object",
	required: ["hold", "spin", "end", "stage"],
	properties: {
		hold: { type: "string" },
		spin: { type: "string" },
		end: { type: "string" },
		stage: { type: "string" },
	},
	additionalProperties: false,
};

const rouletteOptionSchema = {
	type: "object",
	required: ["label", "description"],
	properties: {
		id: { type: "string" },
		label: { type: "string" },
		description: { type: "string" },
	},
	additionalProperties: false,
};

const colorSchema = {
	type: "object",
	required: ["prize", "challenge", "miss", "retry", "border"],
	properties: {
		prize: { type: "string" },
		challenge: { type: "string" },
		miss: { type: "string" },
		retry: { type: "string" },
		border: { type: "string" },
	},
	additionalProperties: false,
};

// Schema principal para Config
export const configSchema = {
	type: "object",
	required: ["id", "prizes", "challenges", "gameOverTitle", "gameOverMessage"],
	properties: {
		id: {
			type: "string",
			minLength: 1,
		},

		passwords: passwordSchema,

		prizes: {
			type: "array",
			items: rouletteOptionSchema,
		},

		challenges: {
			type: "array",
			items: rouletteOptionSchema,
		},

		animatedBackground: videoKeysSchema,

		miss_attempt: {
			type: "integer",
			minimum: 0,
		},

		retry_attempt: {
			type: "integer",
			minimum: 0,
		},

		delayTime: {
			type: "integer",
			minimum: 0,
		},

		shuffle: {
			type: "array",
			items: {
				type: "string",
				enum: ["challenges", "prizes"],
			},
			uniqueItems: true,
		},

		colors: {
			oneOf: [
				colorSchema,
				{
					type: "object",
					maxProperties: 0, // Objeto vacío
				},
			],
		},

		gameOverTitle: {
			type: "string",
			minLength: 1,
		},

		gameOverMessage: {
			type: "string",
			minLength: 1,
		},
	},
	additionalProperties: false,
};

// Función de validación
export const validateConfig = ajv.compile(configSchema);

// Función helper para validar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidConfig(data: Record<string, any>): data is Config {
	const valid = validateConfig(data);
	if (!valid) {
		console.table(validateConfig.errors); // Log errors if invalid
		console.error(ajv.errorsText(validateConfig.errors));
	}
	return valid;
}
