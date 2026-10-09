import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadMessages, saveMessages } from './storage';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('chat storage', () => {
    beforeEach(() => AsyncStorage.clear());

    it('returns an empty list when nothing is saved', async () => {
        expect(await loadMessages()).toEqual([]);
    });

    it('saves and loads messages', async () => {
        const messages = [{ id: '1', text: 'hi', from: 'user' as const }];
        await saveMessages(messages);
        expect(await loadMessages()).toEqual(messages);
    });

    it('returns an empty list on corrupt data', async () => {
        await AsyncStorage.setItem('chatHistory', 'not json');
        expect(await loadMessages()).toEqual([]);
    });

    it('stores at most 100 messages', async () => {
        const many = Array.from({ length: 120 }, (_, i) => ({
            id: String(i),
            text: 'x',
            from: 'bot' as const,
        }));
        await saveMessages(many);
        expect(await loadMessages()).toHaveLength(100);
    });
});