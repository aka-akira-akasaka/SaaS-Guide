export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: Role;
  text: string;
  screenshot?: string | null;
  isError?: boolean;
}

export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
] as const;

export type ModelId = typeof AVAILABLE_MODELS[number]['id'];
