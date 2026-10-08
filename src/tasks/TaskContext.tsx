import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { loadTasks, saveTasks } from './storage';
import { addTask, deleteTask, toggleTask } from './tasks';
import { Task } from './types';
import { scheduleBriefing } from '../briefing/notifications';

type TasksContextValue = {
    tasks: Task[];
    add: (title: string, due?: string) => void;
    toggle: (id: string) => void;
    remove: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadTasks().then((saved) => {
            setTasks(saved);
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (loaded) saveTasks(tasks);
    }, [tasks, loaded]);
    useEffect(() => {
        if (loaded) scheduleBriefing(tasks);
    }, [tasks, loaded]);

    const value: TasksContextValue = {
        tasks,
        add: (title, due) => setTasks((prev) => addTask(prev, title, Date.now().toString(), due)),
        toggle: (id) => setTasks((prev) => toggleTask(prev, id)),
        remove: (id) => setTasks((prev) => deleteTask(prev, id)),
    };

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksContextValue {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error('useTasks must be used inside TasksProvider');
    return ctx;
}