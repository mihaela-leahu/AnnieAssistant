import { buildBriefing } from './buildBriefing';

const task = (id: string, title: string, done = false, due?: string) => ({ id, title, done, due });
const now = new Date(2026, 9, 5, 8, 0); // October 5, 2026, 8:00

describe('buildBriefing', () => {
    it('handles no tasks', () => {
        expect(buildBriefing([], now)).toBe('Good morning! You have no tasks for today. Enjoy your day!');
    });

    it('ignores completed tasks', () => {
        expect(buildBriefing([task('1', 'Call mom', true)], now)).toContain('no tasks');
    });

    it('uses singular for one task', () => {
        expect(buildBriefing([task('1', 'Buy milk')], now)).toBe(
            'Good morning! You have 1 task today:\n• Buy milk',
        );
    });

    it('uses plural for several tasks', () => {
        const text = buildBriefing([task('1', 'Buy milk'), task('2', 'Study')], now);
        expect(text).toContain('You have 2 tasks today:');
        expect(text).toContain('• Study');
    });

    it('shows at most 5 and counts the rest', () => {
        const many = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((n) => task(n, n));
        const text = buildBriefing(many, now);
        expect(text).toContain('• e');
        expect(text).not.toContain('• f');
        expect(text).toContain('...and 2 more');
    });

    it('uses the right greeting for the hour', () => {
        expect(buildBriefing([], new Date(2026, 9, 5, 20, 0))).toContain('Good evening');
    });

    it('hides tasks due in the future', () => {
        expect(buildBriefing([task('1', 'Later', false, '2026-10-06')], now)).toContain('no tasks');
    });

    it('includes tasks due today and overdue ones', () => {
        const text = buildBriefing(
            [task('1', 'Today', false, '2026-10-05'), task('2', 'Late', false, '2026-10-01')],
            now,
        );
        expect(text).toContain('You have 2 tasks today:');
    });
});