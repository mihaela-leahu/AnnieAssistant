import { handleMessage } from './handleMessage';
import {parseCommand} from "@/nlp/parseCommand";

const tasks = [
    { id: '1', title: 'Buy milk', done: false },
    { id: '2', title: 'Call mom', done: true },
];

function makeActions() {
    return { add: jest.fn(), toggle: jest.fn(), remove: jest.fn() };
}

describe('handleMessage', () => {
    it('adds a task', () => {
        const actions = makeActions();
        const reply = handleMessage('add water plants', tasks, actions);
        expect(actions.add).toHaveBeenCalledWith('water plants', undefined);
        expect(reply).toBe('Added "water plants".');
    });

    it('completes a task found by partial name', () => {
        const actions = makeActions();
        const reply = handleMessage('done milk', tasks, actions);
        expect(actions.toggle).toHaveBeenCalledWith('1');
        expect(reply).toBe('Marked "Buy milk" as done.');
    });

    it('does not toggle a task that is already done', () => {
        const actions = makeActions();
        handleMessage('done call mom', tasks, actions);
        expect(actions.toggle).not.toHaveBeenCalled();
    });

    it('says when a task is not found', () => {
        const actions = makeActions();
        const reply = handleMessage('delete banana', tasks, actions);
        expect(actions.remove).not.toHaveBeenCalled();
        expect(reply).toBe('I couldn\'t find "banana".');
    });

    it('deletes a task', () => {
        const actions = makeActions();
        handleMessage('delete buy milk', tasks, actions);
        expect(actions.remove).toHaveBeenCalledWith('1');
    });

    it('lists pending tasks', () => {
        const reply = handleMessage('show my tasks', tasks, makeActions());
        expect(reply).toBe('You have 1 left:\n• Buy milk');
    });

    it('answers an empty list', () => {
        expect(handleMessage('list', [], makeActions())).toBe('You have no tasks.');
    });
    it('parses "add task" and keeps only the title', () => {
        expect(parseCommand('add task water plants')).toEqual({
            type: 'add',
            title: 'water plants',
        });
    });
    it('gives a briefing', () => {
        const reply = handleMessage('briefing', tasks, makeActions(), new Date(2026, 9, 5, 8, 0));
        expect(reply).toBe('Good morning! You have 1 task today:\n• Buy milk');
    });
    it('adds a task with a due date', () => {
        const actions = makeActions();
        const reply = handleMessage('add buy bread tomorrow', tasks, actions, new Date(2026, 9, 5, 10, 0));
        expect(actions.add).toHaveBeenCalledWith('buy bread', '2026-10-06');
        expect(reply).toBe('Added "buy bread" (due 2026-10-06).');
    });
});