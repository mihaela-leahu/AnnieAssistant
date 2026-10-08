import { addTask, deleteTask, toggleTask } from './tasks';

describe('tasks', () => {
    it('adds a task', () => {
        const result = addTask([], 'Buy milk', '1');
        expect(result).toEqual([{ id: '1', title: 'Buy milk', done: false }]);
    });

    it('ignores an empty title', () => {
        expect(addTask([], '   ', '1')).toEqual([]);
    });

    it('toggles a task', () => {
        const start = addTask([], 'Buy milk', '1');
        expect(toggleTask(start, '1')[0].done).toBe(true);
    });

    it('deletes a task', () => {
        const start = addTask([], 'Buy milk', '1');
        expect(deleteTask(start, '1')).toEqual([]);
    });
    it('adds a task with a due date', () => {
        expect(addTask([], 'Buy milk', '1', '2026-10-06')).toEqual([
            { id: '1', title: 'Buy milk', done: false, due: '2026-10-06' },
        ]);
    });
});