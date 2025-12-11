/**
 * Parses a money string and returns the numeric value
 * @param text - The text containing money value (e.g., "$29.99")
 * @returns The numeric value, or 0 if text is null/invalid
 */
export function parseMoney(text: string | null): number {
    if (!text) return 0;
    return Number(text.replace(/[^0-9.]/g, ''));
}
