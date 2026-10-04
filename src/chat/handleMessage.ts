import { parseCommand } from '../nlp/parseCommand';
import { Task } from '../tasks/types';
import { buildBriefing } from '../briefing/buildBriefing';

export type TaskActions = {
    add: (title: string) => void;
    toggle: (id: string) => void;
    remove: (id: string) => void;
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
    hour: number = new Date().getHours(),
): string {
    const command = parseCommand(text);

    switch (command.type) {
        case 'add':
            actions.add(command.title);
            return `Added "${command.title}".`;

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
        case 'briefing':
            return buildBriefing(tasks, hour);

        default:
            return 'Sorry, I didn\'t get that. Try: "add buy milk", "done buy milk", "delete buy milk" or "show my tasks".';
    }
}