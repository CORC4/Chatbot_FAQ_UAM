export interface Message {
  text: string;
  isBot: boolean;
}

export interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

export interface IntentsData {
  intents: Intent[];
}