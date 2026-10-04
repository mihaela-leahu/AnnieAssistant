import { getGreeting } from '../shared/greetings';
import { Task } from '../tasks/types';

const MAX_SHOWN = 5;

export function buildBriefing(tasks: Task[], hour: number): string {
    const greeting = getGreeting(hour);
    const pending = tasks.filter((t) => !t.done);

    if (pending.length === 0) {
        return `${greeting}! You have no tasks for today. Enjoy your day!`;
    }

    const noun = pending.length === 1 ? 'task' : 'tasks';
    const lines = pending.slice(0, MAX_SHOWN).map((t) => `• ${t.title}`);
    if (pending.length > MAX_SHOWN) {
        lines.push(`...and ${pending.length - MAX_SHOWN} more`);
    }

    return `${greeting}! You have ${pending.length} ${noun} today:\n${lines.join('\n')}`;
}