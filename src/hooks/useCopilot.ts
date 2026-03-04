import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendChatMessage, getSuggestions } from '../api/copilot';
import type { ChatMessage, ChatLanguage } from '../types';

export function useCopilot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();

  const suggestionsQuery = useQuery({
    queryKey: ['copilot-suggestions'],
    queryFn: getSuggestions,
  });

  const sendMutation = useMutation({
    mutationFn: ({
      message,
      language,
    }: {
      message: string;
      language: ChatLanguage;
    }) => sendChatMessage({ message, language, sessionId }),
    onSuccess: (assistantMsg) => {
      setMessages((prev) => [...prev, assistantMsg]);
    },
  });

  const send = useCallback(
    async (text: string, language: ChatLanguage = 'english') => {
      // Add user message immediately
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        language,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Send to API
      await sendMutation.mutateAsync({ message: text, language });
    },
    [sessionId],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(undefined);
  }, []);

  return {
    messages,
    suggestions: suggestionsQuery.data ?? [],
    isSending: sendMutation.isPending,
    send,
    clearChat,
  };
}
