import { formatTime, isValidTime } from './briefingTime';

describe('briefingTime', () => {
    it('formats with leading zeros', () => {
        expect(formatTime({ hour: 7, minute: 5 })).toBe('07:05');
    });

    it('accepts valid times', () => {
        expect(isValidTime({ hour: 23, minute: 59 })).toBe(true);
    });

    it('rejects invalid times', () => {
        expect(isValidTime({ hour: 24, minute: 0 })).toBe(false);
        expect(isValidTime({ hour: 8, minute: 60 })).toBe(false);
    });
});