import { Product } from '../data/products';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: Product[];
}

export interface ConversationState {
  userTags: string[];
  recommendedProducts: Product[];
  currentTopic: string | null;
}

export interface ChatResponse {
  message: string;
  products?: Product[];
  newState: ConversationState;
}
