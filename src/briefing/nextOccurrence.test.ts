import { nextOccurrence } from './nextOccurrence';

describe('nextOccurrence', () => {
    it('is today if the time has not passed yet', () => {
        const now = new Date(2026, 9, 4, 7, 0);
        expect(nextOccurrence(now, 8)).toEqual(new Date(2026, 9, 4, 8, 0));
    });

    it('is tomorrow if the time has passed', () => {
        const now = new Date(2026, 9, 4, 9, 0);
        expect(nextOccurrence(now, 8)).toEqual(new Date(2026, 9, 5, 8, 0));
    });

    it('is tomorrow if it is exactly that time', () => {
        const now = new Date(2026, 9, 4, 8, 0);
        expect(nextOccurrence(now, 8)).toEqual(new Date(2026, 9, 5, 8, 0));
    });
});