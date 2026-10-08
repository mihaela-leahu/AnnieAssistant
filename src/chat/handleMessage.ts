import { buildBriefing } from '../briefing/buildBriefing';
import { extractDue } from '../nlp/extractDue';
import { parseCommand } from '../nlp/parseCommand';
import { Task } from '../tasks/types';
import { formatTime } from '../Settings/briefingTime';

export type TaskActions = {
    add: (title: string, due?: string) => void;
    toggle: (id: string) => void;
    remove: (id: string) => void;
    setBriefingTime: (hour: number, minute: number) => void;
};

function findTask(tasks: Task[], title: string): Task | undefined {
    const wanted = title.toLowerCase();
    return (
        tasks.find((t) => t.title.toLowerCase() === wanted) ??
        tasks.find((t) => t.title.toLowerCase().includes(wanted))
    );
}

export function handleMessage(
    text: string,
    tasks: Task[],
    actions: TaskActions,
    now: Date = new Date(),
): string {
    const command = parseCommand(text);

    switch (command.type) {
        case 'add': {
            const { title, due } = extractDue(command.title, now);
            actions.add(title, due);
            return due ? `Added "${title}" (due ${due}).` : `Added "${title}".`;
        }

        case 'complete': {
            const task = findTask(tasks, command.title);
            if (!task) return `I couldn't find "${command.title}".`;
            if (task.done) return `"${task.title}" is already done.`;
            actions.toggle(task.id);
            return `Marked "${task.title}" as done.`;
        }

        case 'delete': {
            const task = findTask(tasks, command.title);
            if (!task) return `I couldn't find "${command.title}".`;
            actions.remove(task.id);
            return `Deleted "${task.title}".`;
        }

        case 'list': {
            if (tasks.length === 0) return 'You have no tasks.';
            const pending = tasks.filter((t) => !t.done);
            if (pending.length === 0) return 'All your tasks are done.';
            return `You have ${pending.length} left:\n` + pending.map((t) => `• ${t.title}`).join('\n');
        }
        case 'setBriefingTime': {
            actions.setBriefingTime(command.hour, command.minute);
            const time = formatTime({ hour: command.hour, minute: command.minute });
            return `Okay, I'll send your briefing at ${time} every day.`;
        }

        case 'briefing':
            return buildBriefing(tasks, now);

        default:
            return 'Sorry, I didn\'t get that. Try: "add buy milk tomorrow", "done buy milk", "delete buy milk", "show my tasks" or "briefing".';
    }
}