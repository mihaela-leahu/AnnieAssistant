import AsyncStorage from '@react-native-async-storage/async-storage';

import { trimHistory } from './history';
import { Message } from './types';

const KEY = 'chatHistory';

export async function loadMessages(): Promise<Message[]> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Message[]) : [];
    } catch {
        return [];
    }
}

export async function saveMessages(messages: Message[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(trimHistory(messages)));
}