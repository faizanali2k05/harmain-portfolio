# chunkwise

Token-aware recursive text chunking for RAG. Zero dependencies.

LangChain's splitters pull ~21MB of deps; llamaindex ~36MB. This is the recursive splitting algorithm alone: paragraph → line → sentence → word → hard split, greedy merge to `maxSize`, approximate `overlap`, and **per-chunk source offsets** — `text.slice(chunk.start, chunk.end) === chunk.text`, always.

```ts
import { chunk, chunkMarkdown } from "chunkwise";
import { countTokens } from "gpt-tokenizer"; // optional — inject any counter

const chunks = chunk(document, { maxSize: 512, overlap: 64, sizer: countTokens });
const mdChunks = chunkMarkdown(readme, { maxSize: 512 }); // never crosses headings
```

Character-based by default; token-accurate when you inject a tokenizer (keeps chunkwise itself zero-dep). MIT.
