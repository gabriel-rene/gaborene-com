import fs from "node:fs"
import path from "node:path"

export interface OsNote {
  slug: string
  title: string
  date: string
  model: string
  taskId: string
  sourceUrl?: string
  body: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "os-notes")

// The publisher writes one `key: <json>` line per field; JSON is valid
// YAML, so this parser only ever sees `name: "json string"` lines.
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith("---\n")) throw new Error("os-note missing frontmatter")
  const end = raw.indexOf("\n---\n", 4)
  if (end < 0) throw new Error("os-note frontmatter unterminated")
  const meta: Record<string, string> = {}
  for (const line of raw.slice(4, end + 1).split("\n")) {
    if (!line.trim()) continue
    const sep = line.indexOf(": ")
    if (sep < 0) throw new Error(`os-note bad frontmatter line: ${line}`)
    meta[line.slice(0, sep)] = JSON.parse(line.slice(sep + 2)) as string
  }
  return { meta, body: raw.slice(end + 5) }
}

// Build-time guard: curated or not, raw HTML never ships from a note.
//
// Kept deliberately narrow — real hazards only, so it never false-positives
// on prose or fenced code (e.g. `content = f.read()`, `config = load()`).
// Mirrored server-side in agent-os's publisher/extract.py::body_hazard —
// keep the two textually in sync.
const HAZARD_TAG = /<(script|iframe|object|embed)\b/i
// Event handlers only count in actual tag context, not in bare `foo = bar`
// prose/code that happens to contain "on...=" as a substring.
const HAZARD_TAG_EVENT_HANDLER = /<\w[^>]*\son\w+\s*=/i
// javascript:/data:/vbscript: only count where they can execute: a markdown
// link target, or an HTML href/src attribute. `\s` already spans newlines,
// so this tolerates whitespace/newlines after `](`.
const HAZARD_SCHEME_MD_LINK = /\]\(\s*(javascript|data|vbscript):/i
const HAZARD_SCHEME_ATTR = /\b(?:href|src)\s*=\s*["']?\s*(javascript|data|vbscript):/i

function assertNoRawHtmlHazard(slug: string, body: string) {
  if (
    HAZARD_TAG.test(body) ||
    HAZARD_TAG_EVENT_HANDLER.test(body) ||
    HAZARD_SCHEME_MD_LINK.test(body) ||
    HAZARD_SCHEME_ATTR.test(body)
  ) {
    throw new Error(`os-note ${slug} contains raw HTML hazards — refuse to build`)
  }
}

export function getOsNotes(): OsNote[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse()
    .map((f) => {
      const slug = f.replace(/\.md$/, "")
      const { meta, body } = parseFrontmatter(
        fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"),
      )
      assertNoRawHtmlHazard(slug, body)
      return {
        slug,
        title: meta.title,
        date: meta.date,
        model: meta.model,
        taskId: meta.task_id,
        sourceUrl: meta.source_url,
        body,
      }
    })
}
