import { buildBriefing } from './buildBriefing';
import {parseCommand} from "@/nlp/parseCommand";

const task = (id: string, title: string, done = false) => ({ id, title, done });

describe('buildBriefing', () => {
    it('handles no tasks', () => {
        expect(buildBriefing([], 8)).toBe('Good morning! You have no tasks for today. Enjoy your day!');
    });

    it('ignores completed tasks', () => {
        expect(buildBriefing([task('1', 'Call mom', true)], 8)).toContain('no tasks');
    });

    it('uses singular for one task', () => {
        expect(buildBriefing([task('1', 'Buy milk')], 8)).toBe(
            'Good morning! You have 1 task today:\n• Buy milk',
        );
    });

    it('uses plural for several tasks', () => {
        const text = buildBriefing([task('1', 'Buy milk'), task('2', 'Study')], 8);
        expect(text).toContain('You have 2 tasks today:');
        expect(text).toContain('• Study');
    });

    it('shows at most 5 and counts the rest', () => {
        const many = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((n) => task(n, n));
        const text = buildBriefing(many, 8);
        expect(text).toContain('• e');
        expect(text).not.toContain('• f');
        expect(text).toContain('...and 2 more');
    });

    it('uses the right greeting for the hour', () => {
        expect(buildBriefing([], 20)).toContain('Good evening');
    });
    it('parses briefing', () => {
        expect(parseCommand('morning briefing')).toEqual({ type: 'briefing' });
    });
});