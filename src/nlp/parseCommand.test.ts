import { parseCommand } from './parseCommand';

describe('parseCommand', () => {
    it('parses add', () => {
        expect(parseCommand('add buy milk')).toEqual({ type: 'add', title: 'buy milk' });
    });

    it('parses "remind me to" ignoring capitals', () => {
        expect(parseCommand('Remind me to call mom')).toEqual({ type: 'add', title: 'call mom' });
    });

    it('parses complete', () => {
        expect(parseCommand('done buy milk')).toEqual({ type: 'complete', title: 'buy milk' });
    });

    it('parses delete', () => {
        expect(parseCommand('delete buy milk')).toEqual({ type: 'delete', title: 'buy milk' });
    });

    it('parses list', () => {
        expect(parseCommand('show my tasks')).toEqual({ type: 'list' });
    });

    it('returns unknown for other text', () => {
        expect(parseCommand('hello there')).toEqual({ type: 'unknown' });
    });

    it('returns unknown for add with no title', () => {
        expect(parseCommand('add')).toEqual({ type: 'unknown' });
    });

    it('parses "add task" and keeps only the title', () => {
        expect(parseCommand('add task water plants')).toEqual({
            type: 'add',
            title: 'water plants',
        });
    });
    it('parses setting the briefing time', () => {
        expect(parseCommand('set briefing 7:30')).toEqual({ type: 'setBriefingTime', hour: 7, minute: 30 });
        expect(parseCommand('set briefing time to 9')).toEqual({ type: 'setBriefingTime', hour: 9, minute: 0 });
        expect(parseCommand('briefing at 06:45')).toEqual({ type: 'setBriefingTime', hour: 6, minute: 45 });
    });

    it('rejects an impossible briefing time', () => {
        expect(parseCommand('set briefing 25:00')).toEqual({ type: 'unknown' });
    });
});