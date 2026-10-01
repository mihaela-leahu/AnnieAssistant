import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadTasks, saveTasks } from './storage';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('storage', () => {
    beforeEach(() => AsyncStorage.clear());

    it('returns an empty list when nothing is saved', async () => {
        expect(await loadTasks()).toEqual([]);
    });

    it('saves and loads tasks', async () => {
        const tasks = [{ id: '1', title: 'Buy milk', done: false }];
        await saveTasks(tasks);
        expect(await loadTasks()).toEqual(tasks);
    });
});