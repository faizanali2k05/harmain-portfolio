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
/** A chunk of the source text with its location. */
export interface Chunk {
    /** The chunk text, sliced verbatim from the input. */
    text: string;
    /** Inclusive start offset (UTF-16 code units) into the original input. */
    start: number;
    /** Exclusive end offset into the original input. */
    end: number;
}
export interface ChunkOptions {
    /** Maximum chunk size in `sizer` units. Default 512. */
    maxSize?: number;
    /**
     * Desired overlap between consecutive chunks, in `sizer` units.
     * Overlap is built from whole atomic pieces, so it is approximate.
     * Default 0.
     */
    overlap?: number;
    /**
     * Measures a piece of text. Defaults to `(s) => s.length` (characters).
     * Inject a token counter (e.g. from gpt-tokenizer) for token-accurate
     * chunking — this keeps chunkwise itself zero-dependency.
     */
    sizer?: (text: string) => number;
    /**
     * Separator hierarchy, tried in order; the last resort splits anywhere.
     * Default: paragraph, newline, sentence-ish, word, character.
     */
    separators?: (string | RegExp)[];
}
export declare const DEFAULT_SEPARATORS: (string | RegExp)[];
/**
 * Splits `text` into chunks of at most `maxSize` (per `sizer`), preferring
 * to break at the highest-level separator possible, with approximate
 * `overlap` between consecutive chunks. Offsets always index the original
 * string: `text.slice(chunk.start, chunk.end) === chunk.text`.
 */
export declare function chunk(text: string, options?: ChunkOptions): Chunk[];
/** Markdown-aware chunking: the document is first sectioned at headings
 * (`#`–`######`), then each section is chunked normally; chunks never span a
 * heading boundary. Offsets still index the original document. */
export declare function chunkMarkdown(text: string, options?: ChunkOptions): Chunk[];
