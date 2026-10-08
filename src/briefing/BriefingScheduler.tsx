import { useEffect } from 'react';

import { useSettings } from '../Settings/settingsContext';
import { useTasks } from '../tasks/TaskContext';
import { scheduleBriefing } from './notifications';

export function BriefingScheduler() {
    const { tasks, loaded: tasksLoaded } = useTasks();
    const { briefingTime, loaded: settingsLoaded } = useSettings();
    const ready = tasksLoaded && settingsLoaded;

    useEffect(() => {
        if (ready) scheduleBriefing(tasks, briefingTime);
    }, [tasks, briefingTime, ready]);

    return null;
}