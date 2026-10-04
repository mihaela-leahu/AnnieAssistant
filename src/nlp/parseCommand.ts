export type Command =
    | { type: 'add'; title: string }
    | { type: 'complete'; title: string }
    | { type: 'delete'; title: string }
    | { type: 'list' }
    | { type: 'unknown' }
    | { type: 'briefing' };

export function parseCommand(input: string): Command {
    const text = input.trim();

    const add = text.match(/^(?:add task|add|remind me to|i need to)\s+(.+)$/i);
    if (add) return { type: 'add', title: add[1].trim() };

    const complete = text.match(/^(?:done with|done|finish|complete)\s+(.+)$/i);
    if (complete) return { type: 'complete', title: complete[1].trim() };

    const del = text.match(/^(?:delete|remove)\s+(.+)$/i);
    if (del) return { type: 'delete', title: del[1].trim() };

    if (
        /^(?:list|show)(?:\s+(?:my\s+)?tasks)?$/i.test(text) ||
        /^(?:my\s+)?tasks$/i.test(text) ||
        /^what(?:'s| is) on my (?:list|tasks)\??$/i.test(text)
    ) {
        return { type: 'list' };
    }
    if (/^(?:brief me|(?:morning )?briefing|my day)$/i.test(text)) {
        return { type: 'briefing' };
    }
    return { type: 'unknown' };
}