export function formatDate(d: Date): string {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
}

export function extractDue(text: string, now: Date): { title: string; due?: string } {
    const match = text.match(/\s+(?:for\s+|due\s+)?(today|tomorrow)$/i);
    if (!match) return { title: text.trim() };

    const date = new Date(now);
    if (match[1].toLowerCase() === 'tomorrow') date.setDate(date.getDate() + 1);

    return { title: text.slice(0, match.index).trim(), due: formatDate(date) };
}