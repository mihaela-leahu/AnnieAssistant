export function nextOccurrence(now: Date, hour: number, minute = 0): Date {
    const next = new Date(now);
    next.setHours(hour, minute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return next;
}