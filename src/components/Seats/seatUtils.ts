import type { ISeat, RowConfig } from '../../types';

export const ROWS: RowConfig[] = [
    { id: 'A', type: 'standard', count: 8 },
    { id: 'B', type: 'standard', count: 8 },
    { id: 'C', type: 'standard', count: 8 },
    { id: 'D', type: 'recliner', count: 8 },
    { id: 'E', type: 'recliner', count: 8 },
];

export const TOTAL_SEATS = ROWS.reduce((s, r) => s + r.count, 0);


export const DEFAULT_BASE_PRICE = 150;

export function buildSeatGrid(occupiedSeatsIds: string[] = []): ISeat[] {
    const seats: ISeat[] = [];
    const occupiedSet = new Set(occupiedSeatsIds);

    for (const row of ROWS) {
        for (let n = 1; n <= row.count; n++) {
            const id = `${row.id}${n}`;
            seats.push({
                id,
                row: row.id,
                number: n,
                type: row.type,
                status: occupiedSet.has(id) ? 'booked' : 'available',
            });
        }
    }
    return seats;
}


export function formatSlot(slotParam: string): { date: string; time: string } {
    try {
        const decoded = decodeURIComponent(slotParam);
        const d = new Date(decoded);
        if (isNaN(d.getTime())) return { date: slotParam, time: '' };
        return {
            date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };
    } catch {
        return { date: slotParam, time: '' };
    }
}

