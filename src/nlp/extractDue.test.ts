import { extractDue } from './extractDue';

const now = new Date(2026, 9, 5, 10, 0); // October 5, 2026

describe('extractDue', () => {
    it('reads tomorrow', () => {
        expect(extractDue('buy milk tomorrow', now)).toEqual({ title: 'buy milk', due: '2026-10-06' });
    });

    it('reads today', () => {
        expect(extractDue('call mom today', now)).toEqual({ title: 'call mom', due: '2026-10-05' });
    });

    it('ignores capitals and filler words', () => {
        expect(extractDue('Finish report for TOMORROW', now)).toEqual({
            title: 'Finish report',
            due: '2026-10-06',
        });
    });

    it('leaves text without a date untouched', () => {
        expect(extractDue('buy milk', now)).toEqual({ title: 'buy milk' });
    });

    it('rolls over to the next month', () => {
        const endOfMonth = new Date(2026, 9, 31, 10, 0);
        expect(extractDue('pay rent tomorrow', endOfMonth).due).toBe('2026-11-01');
    });
});