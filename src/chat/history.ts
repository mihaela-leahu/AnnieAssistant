import { Message } from './types';

export const MAX_MESSAGES = 100;

export function trimHistory(messages: Message[]): Message[] {
    return messages.length > MAX_MESSAGES ? messages.slice(-MAX_MESSAGES) : messages;
}