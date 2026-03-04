import apiClient from './client';
import { ENDPOINTS } from '../constants/endpoints';
import type { ChatMessage, ChatRequest } from '../types';

export async function sendChatMessage(payload: ChatRequest) {
  const { data } = await apiClient.post<ChatMessage>(
    ENDPOINTS.COPILOT_CHAT,
    payload,
  );
  return data;
}

export async function getSuggestions() {
  const { data } = await apiClient.get<string[]>(ENDPOINTS.COPILOT_SUGGESTIONS);
  return data;
}
