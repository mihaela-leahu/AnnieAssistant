import { MAX_MESSAGES, trimHistory } from './history';

const make = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ id: String(i), text: `m${i}`, from: 'user' as const }));

describe('trimHistory', () => {
    it('keeps a short history as is', () => {
        expect(trimHistory(make(5))).toHaveLength(5);
    });

    it('keeps only the newest messages', () => {
        const result = trimHistory(make(150));
        expect(result).toHaveLength(MAX_MESSAGES);
        expect(result[0].id).toBe('50');
    });
});