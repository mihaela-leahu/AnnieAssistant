import * as Notifications from 'expo-notifications';

import { Task } from '../tasks/types';
import { buildBriefing } from './buildBriefing';
import { nextOccurrence } from './nextOccurrence';

const BRIEFING_HOUR = 8;
const BRIEFING_MINUTE = 0;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function scheduleBriefing(tasks: Task[]): Promise<void> {
    try {
        const { granted } = await Notifications.requestPermissionsAsync();
        if (!granted) return;

        const when = nextOccurrence(new Date(), BRIEFING_HOUR, BRIEFING_MINUTE);

        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Morning briefing',
                body: buildBriefing(tasks, when),
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: when,
            },
        });
    } catch (e) {
        console.warn('Could not schedule briefing', e);
    }
}