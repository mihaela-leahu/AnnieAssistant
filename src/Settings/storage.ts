import AsyncStorage from '@react-native-async-storage/async-storage';

import { BriefingTime, DEFAULT_BRIEFING_TIME, isValidTime } from './briefingTime';

const KEY = 'briefingTime';

export async function loadBriefingTime(): Promise<BriefingTime> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return DEFAULT_BRIEFING_TIME;
        const parsed = JSON.parse(raw) as BriefingTime;
        return isValidTime(parsed) ? parsed : DEFAULT_BRIEFING_TIME;
    } catch {
        return DEFAULT_BRIEFING_TIME;
    }
}

export async function saveBriefingTime(time: BriefingTime): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(time));
}