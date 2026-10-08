export type BriefingTime = { hour: number; minute: number };

export const DEFAULT_BRIEFING_TIME: BriefingTime = { hour: 8, minute: 0 };

export function isValidTime(time: BriefingTime): boolean {
    return (
        Number.isInteger(time.hour) &&
        Number.isInteger(time.minute) &&
        time.hour >= 0 &&
        time.hour <= 23 &&
        time.minute >= 0 &&
        time.minute <= 59
    );
}

export function formatTime({ hour, minute }: BriefingTime): string {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}