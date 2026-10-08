import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_BRIEFING_TIME } from './briefingTime';
import { loadBriefingTime, saveBriefingTime } from './storage';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('briefing time storage', () => {
    beforeEach(() => AsyncStorage.clear());

    it('returns the default when nothing is saved', async () => {
        expect(await loadBriefingTime()).toEqual(DEFAULT_BRIEFING_TIME);
    });

    it('saves and loads a time', async () => {
        await saveBriefingTime({ hour: 7, minute: 30 });
        expect(await loadBriefingTime()).toEqual({ hour: 7, minute: 30 });
    });

    it('falls back to the default on corrupt data', async () => {
        await AsyncStorage.setItem('briefingTime', 'not json');
        expect(await loadBriefingTime()).toEqual(DEFAULT_BRIEFING_TIME);
    });
});