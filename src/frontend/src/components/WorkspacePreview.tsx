import {
  Layers,
  FileCode2,
  BookOpen,
  Play,
  LogOut,
  ChevronRight,
  ChevronDown,
  X,
  Circle,
} from "lucide-react";

/**
 * Static, presentational mirror of the real workspace UI — same tokens,
 * same layout, no provider/context/SSE/editor weight. Hero-only.
 */
export function WorkspacePreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--surface-0)] text-[var(--text-[var(--red)])]" aria-hidden>
      {/* Top context bar */}
      <div className="flex h-7 flex-shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 font-mono text-[10px] text-[var(--text-ghost)]">
        <div className="flex items-center gap-2 truncate">
          <span className="text-[var(--red)]/80">◢</span>
          <span className="truncate text-[var(--text-secondary)]">Crea tu Servidor HTTP</span>
          <span className="text-border">/</span>
          <span className="truncate">Módulo 5 — Static Files</span>
          <span className="text-border">/</span>
          <span className="truncate text-[var(--text-[var(--red)])]">
            Protección contra path traversal
          </span>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="tabular-nums text-[var(--text-secondary)]">18</span>
            <span className="text-border">/</span>
            <span className="tabular-nums">15</span>
            <span className="ml-1 h-[3px] w-16 bg-[var(--border)]">
              <span className="block h-full w-[80%] bg-[var(--red)]" />
            </span>
          </div>
          <span className="rounded border border-[var(--border-subtle)] px-1.5 py-[1px] text-[9px] tracking-widest">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Icon rail */}
        <div className="flex w-10 flex-shrink-0 flex-col items-center justify-between border-r border-[var(--border-subtle)] bg-[var(--surface-1)] py-2">
          <div className="flex flex-col items-center gap-0.5">
            <RailIcon icon={<Layers size={14} strokeWidth={1.5} />} label="mod" active />
            <RailIcon icon={<FileCode2 size={14} strokeWidth={1.5} />} label="files" />
            <RailIcon icon={<BookOpen size={14} strokeWidth={1.5} />} label="docs" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <button className="flex h-9 w-9 flex-col items-center justify-center bg-[var(--red)] text-[8px] font-medium uppercase tracking-widest text-[var(--text-[var(--red)])]">
              <Play size={12} strokeWidth={2} className="mb-0.5" />
              <span>run</span>
            </button>
            <RailIcon icon={<LogOut size={14} strokeWidth={1.5} />} label="exit" />
          </div>
        </div>

        {/* Modules panel */}
        <div className="flex w-[180px] flex-shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-1)]">
          <div className="flex h-7 flex-shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-ghost)]">
            <span>Modules</span>
            <span className="rounded-sm bg-[var(--surface-0)] px-1 py-[1px] text-[8px] normal-case text-[var(--text-secondary)]">
              go
            </span>
          </div>
          <div className="flex flex-col overflow-hidden px-2 py-2 font-mono text-[10px]">
            <div className="mb-2 px-1 text-[10px] font-medium leading-tight text-[var(--text-[var(--red)])]">
              Crea tu Servidor HTTP
            </div>
            <ModuleRow label="Módulo 1 — TCP Foundation" progress="2/2" />
            <ModuleRow label="Módulo 2 — HTTP Parsing" progress="3/3" />
            <ModuleRow label="Módulo 3 — HTTP Response" progress="2/2" />
            <ModuleRow label="Módulo 4 — Router" progress="2/2" />
            <ModuleRow
              label="Módulo 5 — Static Files"
              progress="1/3"
              expanded
              subs={[
                { label: "Servir archivo con MIME type", state: "done" },
                { label: "Protección contra path traversal", state: "active" },
                { label: "Fallback a index.html", state: "locked" },
              ]}
            />
            <ModuleRow label="Módulo 6 — Middleware" progress="0/3" />
          </div>
        </div>

        {/* Main column: task + tabs + editor + tests */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Task brief collapsed */}
          <div className="flex h-7 flex-shrink-0 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 font-mono text-[10px]">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--text-ghost)]">
              Task
            </span>
            <span className="truncate text-[var(--text-[var(--red)])]">
              Protección contra path traversal
            </span>
            <span className="text-border">—</span>
            <span className="truncate text-[var(--text-secondary)]">
              Agrega protección ANTES de abrir el archivo.
            </span>
          </div>

          {/* Tab bar */}
          <div className="flex h-7 flex-shrink-0 items-center border-b border-[var(--border-subtle)] bg-[var(--surface-1)]">
            <TabItem name="go.mod" ext="mod" />
            <TabItem name="Hint: filepath.Abs" resource />
            <TabItem name="Signature: traversal" resource />
            <TabItem name="request.go" ext="go" active />
          </div>

          {/* Editor surface */}
          <div className="relative flex min-h-0 flex-1 overflow-hidden bg-[var(--surface-0)] font-mono text-[10.5px] leading-[1.55]">
            {/* Line gutter */}
            <div className="flex w-10 flex-shrink-0 flex-col items-end pr-2 pt-2 text-[var(--text-ghost)]/70 tabular-nums">
              {Array.from({ length: 20 }, (_, i) => 40 + i).map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            {/* Code */}
            <pre className="m-0 flex-1 overflow-hidden whitespace-pre pt-2 pr-3">
              <CodeLine>
                <K>for</K> {"{"}
              </CodeLine>
              <CodeLine>
                {"  "}line, err := reader.<Fn>ReadString</Fn>({"'"}<S>\n</S>{"'"})
              </CodeLine>
              <CodeLine>
                {"  "}<K>if</K> err != <K>nil</K> {"{"}
              </CodeLine>
              <CodeLine>
                {"    "}<K>return</K> <K>nil</K>, fmt.<Fn>Errorf</Fn>(<S>&quot;error leyendo headers: %w&quot;</S>, err)
              </CodeLine>
              <CodeLine>{"  }"}</CodeLine>
              <CodeLine>
                {"  "}line = strings.<Fn>TrimRight</Fn>(line, <S>&quot;\r\n&quot;</S>)
              </CodeLine>
              <CodeLine>{""}</CodeLine>
              <CodeLine>
                {"  "}<C>{`// Línea vacía = fin de headers`}</C>
              </CodeLine>
              <CodeLine>
                {"  "}<K>if</K> line == <S>&quot;&quot;</S> {"{"}
              </CodeLine>
              <CodeLine>
                {"    "}<K>break</K>
              </CodeLine>
              <CodeLine>{"  }"}</CodeLine>
              <CodeLine>{""}</CodeLine>
              <CodeLine>
                {"  "}<C>{`// Formato "Key: Value"`}</C>
              </CodeLine>
              <CodeLine>
                {"  "}headerParts := strings.<Fn>SplitN</Fn>(line, <S>&quot;:&quot;</S>, <N>2</N>)
              </CodeLine>
              <CodeLine>
                {"  "}<K>if</K> <Fn>len</Fn>(headerParts) != <N>2</N> {"{"}
              </CodeLine>
              <CodeLine>
                {"    "}<K>continue</K>
              </CodeLine>
              <CodeLine>{"  }"}</CodeLine>
              <CodeLine>{""}</CodeLine>
              <CodeLine>
                {"  "}key := strings.<Fn>TrimSpace</Fn>(headerParts[<N>0</N>])
              </CodeLine>
              <CodeLine>
                {"  "}val := strings.<Fn>TrimSpace</Fn>(headerParts[<N>1</N>])
              </CodeLine>
            </pre>
          </div>

          {/* Test output panel */}
          <div className="flex h-[110px] flex-shrink-0 flex-col border-t border-[var(--border-subtle)] bg-[var(--surface-1)]">
            <div className="flex h-6 flex-shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-ghost)]">
              <div className="flex items-center gap-3">
                <span>Tests</span>
                <span className="normal-case tracking-normal text-[var(--text-secondary)]">
                  <span className="tabular-nums">0</span>/
                  <span className="tabular-nums">1</span> passed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[var(--red)] normal-case tracking-normal">
                  <Play size={9} strokeWidth={2} />
                  run
                </span>
                <X size={10} className="text-[var(--text-ghost)]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex-1 overflow-hidden px-3 pt-2 font-mono text-[10px] leading-[1.6]">
              <div className="flex items-center gap-2 text-[var(--text-ghost)]">
                <Circle size={8} strokeWidth={1.5} className="text-[var(--text-ghost)]" />
                <span>Compilando…</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-red-500">
                <span className="text-[10px]">⊘</span>
                <span>Algunas pruebas fallaron</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- atoms ---------- */

function RailIcon({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex h-9 w-9 flex-col items-center justify-center gap-0.5 text-[8px] uppercase tracking-widest ${
        active ? "bg-[var(--surface-0)] text-[var(--text-[var(--red)])]" : "text-[var(--text-ghost)]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function ModuleRow({
  label,
  progress,
  expanded,
  subs,
}: {
  label: string;
  progress: string;
  expanded?: boolean;
  subs?: { label: string; state: "done" | "active" | "locked" }[];
}) {
  return (
    <div className="mb-[1px]">
      <div
        className={`flex items-center justify-between rounded-sm px-1 py-[3px] ${
          expanded ? "text-[var(--text-[var(--red)])]" : "text-[var(--text-secondary)]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-1">
          {expanded ? (
            <ChevronDown size={10} strokeWidth={1.5} className="flex-shrink-0 text-[var(--text-ghost)]" />
          ) : (
            <ChevronRight size={10} strokeWidth={1.5} className="flex-shrink-0 text-[var(--text-ghost)]" />
          )}
          <span className="truncate text-[10px]">{label}</span>
        </div>
        <span className="flex-shrink-0 text-[9px] tabular-nums text-[var(--text-ghost)]">
          {progress}
        </span>
      </div>
      {expanded && subs && (
        <div className="mt-[1px] flex flex-col gap-[1px] pl-4">
          {subs.map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-1.5 rounded-sm px-1 py-[2px] text-[10px] ${
                s.state === "active"
                  ? "bg-[var(--red)]/10 text-[var(--text-[var(--red)])]"
                  : s.state === "done"
                  ? "text-[var(--text-secondary)]"
                  : "text-[var(--text-ghost)]/70"
              }`}
            >
              {s.state === "done" && <span className="text-green-500">✓</span>}
              {s.state === "active" && <span className="text-[var(--red)]">⊘</span>}
              {s.state === "locked" && <span className="text-[var(--text-ghost)]">○</span>}
              <span className="truncate">{s.label}</span>
              {s.state === "active" && (
                <span className="ml-auto text-[8px] tabular-nums text-[var(--red)]">1</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EXT_COLOR: Record<string, string> = {
  go: "bg-teal-400",
  mod: "bg-teal-400",
};

function TabItem({
  name,
  ext,
  active,
  resource,
}: {
  name: string;
  ext?: string;
  active?: boolean;
  resource?: boolean;
}) {
  return (
    <div
      className={`relative flex h-7 items-center gap-1.5 border-r border-[var(--border-subtle)] px-2.5 font-mono text-[10px] ${
        active ? "bg-[var(--surface-0)] text-[var(--text-[var(--red)])]" : "text-[var(--text-ghost)]"
      }`}
    >
      {active && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[var(--red)]" />
      )}
      {resource ? (
        <BookOpen size={9} strokeWidth={1.5} className="flex-shrink-0 text-[var(--text-ghost)]" />
      ) : (
        <span
          className={`h-1 w-1 flex-shrink-0 rounded-full ${
            EXT_COLOR[ext ?? ""] ?? "bg-text-dim"
          }`}
        />
      )}
      <span className="max-w-[140px] truncate">{name}</span>
      <X
        size={9}
        strokeWidth={1.5}
        className={`ml-0.5 flex-shrink-0 ${active ? "text-[var(--text-ghost)]" : "text-transparent"}`}
      />
    </div>
  );
}

/* ---------- syntax tokens ---------- */

function CodeLine({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre">{children}</div>;
}
function K({ children }: { children: React.ReactNode }) {
  return <span className="text-[#ff5f7e]">{children}</span>;
}
function Fn({ children }: { children: React.ReactNode }) {
  return <span className="text-[#e5b661]">{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}
function C({ children }: { children: React.ReactNode }) {
  return <span className="italic text-[#6a7a7a]">{children}</span>;
}
function N({ children }: { children: React.ReactNode }) {
  return <span className="text-[#d1a6ff]">{children}</span>;
}
