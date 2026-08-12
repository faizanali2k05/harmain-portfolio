/**
 * chunkwise — token-aware recursive text chunking for RAG pipelines.
 *
 * LangChain's splitters pull ~21MB of dependencies; llamaindex ~36MB. This is
 * the recursive splitting algorithm alone: configurable size and overlap, a
 * pluggable size function (characters by default, inject your tokenizer for
 * token-accurate chunks), markdown-heading awareness, and per-chunk source
 * offsets so every chunk maps back into the original document.
 * Zero dependencies.
 */
export const DEFAULT_SEPARATORS = [
    "\n\n",
    "\n",
    /(?<=[.!?])\s+/,
    " ",
];
/**
 * Splits `text` into chunks of at most `maxSize` (per `sizer`), preferring
 * to break at the highest-level separator possible, with approximate
 * `overlap` between consecutive chunks. Offsets always index the original
 * string: `text.slice(chunk.start, chunk.end) === chunk.text`.
 */
export function chunk(text, options = {}) {
    const maxSize = options.maxSize ?? 512;
    const overlap = options.overlap ?? 0;
    const sizer = options.sizer ?? ((s) => s.length);
    const separators = options.separators ?? DEFAULT_SEPARATORS;
    if (maxSize <= 0)
        throw new RangeError("maxSize must be positive");
    if (overlap < 0 || overlap >= maxSize)
        throw new RangeError("overlap must be in [0, maxSize)");
    if (text.length === 0)
        return [];
    const pieces = atomize(text, 0, maxSize, sizer, separators);
    return merge(pieces, text, maxSize, overlap, sizer);
}
/** Recursively splits until every piece fits in maxSize. */
function atomize(text, offset, maxSize, sizer, separators) {
    const size = sizer(text);
    if (size <= maxSize) {
        return text.length > 0 ? [{ start: offset, end: offset + text.length, size }] : [];
    }
    const [sep, ...rest] = separators;
    if (sep === undefined) {
        // Last resort: hard split by halves of the string until it fits.
        const mid = Math.ceil(text.length / 2);
        return [
            ...atomize(text.slice(0, mid), offset, maxSize, sizer, []),
            ...atomize(text.slice(mid), offset + mid, maxSize, sizer, []),
        ];
    }
    const parts = splitKeepingOffsets(text, sep);
    if (parts.length <= 1)
        return atomize(text, offset, maxSize, sizer, rest);
    const out = [];
    for (const p of parts) {
        out.push(...atomize(text.slice(p.start, p.end), offset + p.start, maxSize, sizer, rest));
    }
    return out;
}
/** Splits on a separator, returning segment offsets (separators are kept
 * attached to the preceding segment so nothing is lost). */
function splitKeepingOffsets(text, sep) {
    const re = typeof sep === "string"
        ? new RegExp(escapeRegExp(sep), "g")
        : new RegExp(sep.source, sep.flags.includes("g") ? sep.flags : sep.flags + "g");
    const out = [];
    let last = 0;
    for (const m of text.matchAll(re)) {
        const end = m.index + m[0].length;
        if (end > last)
            out.push({ start: last, end });
        last = end;
    }
    if (last < text.length)
        out.push({ start: last, end: text.length });
    return out;
}
function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** Greedily merges atomic pieces into chunks, then applies overlap by
 * re-including trailing pieces of the previous chunk. */
function merge(pieces, text, maxSize, overlap, sizer) {
    const chunks = [];
    let i = 0;
    while (i < pieces.length) {
        let start = pieces[i].start;
        let end = pieces[i].end;
        let size = pieces[i].size;
        let j = i + 1;
        while (j < pieces.length && size + pieces[j].size <= maxSize) {
            size += pieces[j].size;
            end = pieces[j].end;
            j++;
        }
        // Overlap: walk back from the end of this chunk to find where the next
        // chunk should begin so ~`overlap` units are shared.
        let next = j;
        if (overlap > 0 && j < pieces.length) {
            let shared = 0;
            let k = j - 1;
            while (k > i && shared + pieces[k].size <= overlap) {
                shared += pieces[k].size;
                k--;
            }
            next = Math.max(i + 1, k + 1);
        }
        const raw = text.slice(start, end);
        const trimmed = raw.trim();
        if (trimmed.length > 0) {
            const lead = raw.length - raw.trimStart().length;
            chunks.push({ text: trimmed, start: start + lead, end: start + lead + trimmed.length });
        }
        i = next;
    }
    return chunks;
}
/** Markdown-aware chunking: the document is first sectioned at headings
 * (`#`–`######`), then each section is chunked normally; chunks never span a
 * heading boundary. Offsets still index the original document. */
export function chunkMarkdown(text, options = {}) {
    const headings = [...text.matchAll(/^#{1,6}\s.*$/gm)];
    const bounds = [0, ...headings.map((m) => m.index).filter((i) => i > 0), text.length];
    const out = [];
    for (let i = 0; i + 1 < bounds.length; i++) {
        const start = bounds[i];
        const end = bounds[i + 1];
        if (end <= start)
            continue;
        for (const c of chunk(text.slice(start, end), options)) {
            out.push({ text: c.text, start: c.start + start, end: c.end + start });
        }
    }
    return out;
}
