import { Task } from './types';

export function addTask(tasks: Task[], title: string, id: string): Task[] {
    const clean = title.trim();
    if (!clean) return tasks;
    return [...tasks, { id, title: clean, done: false }];
}

export function toggleTask(tasks: Task[], id: string): Task[] {
    return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function deleteTask(tasks: Task[], id: string): Task[] {
    return tasks.filter((t) => t.id !== id);
}