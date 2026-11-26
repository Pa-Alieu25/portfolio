import type { Diagram, DiagramNode, GraphDiagram, StepsDiagram } from "@/data/diagrams";

/** Renders a diagram as static inline SVG: a desktop drawing plus a phone layout. */

function Markers({ id }: { id: string }) {
  return <defs>
    {(["arrow", "arrow-data", "arrow-planned"] as const).map(kind => (
      <marker key={kind} id={`${id}-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className={kind} />
      </marker>
    ))}
  </defs>;
}

const markerFor = (id: string, kind?: string) => kind === "relation" ? undefined : `url(#${id}-${kind === "data" ? "arrow-data" : kind === "planned" ? "arrow-planned" : "arrow"})`;

function NodeShape({ node, title, sub, x, y, w, h, small }: { node: DiagramNode; title: string; sub?: string; x: number; y: number; w: number; h: number; small?: boolean }) {
  const kind = node.kind ?? "box";
  const lines = small ? (sub ? [sub] : []) : node.lines ?? (sub ? [sub] : []);
  const top = y + (small ? 22 : 24);
  return <g>
    <rect className={kind} x={x} y={y} width={w} height={h} rx={4} />
    <text className={`t${kind === "planned" ? " planned-t" : ""}`} x={x + 12} y={top} style={small ? { fontSize: 13 } : undefined}>{title}</text>
    {lines.map((line, index) => <text key={line} className="s" x={x + 12} y={top + 19 + index * 17}>{line}</text>)}
  </g>;
}

function GraphDesktop({ d }: { d: GraphDiagram }) {
  const id = `${d.id}-d`;
  return <svg className={`dg dg-desk dg-${d.theme}`} viewBox={`0 0 ${d.width} ${d.height}`} role="img" aria-label={d.alt}>
    <Markers id={id} />
    {d.groups?.map(group => <g key={group.label}>
      <rect className="grp" x={group.x} y={group.y} width={group.w} height={group.h} rx={6} />
      <text className="g" x={group.x + 12} y={group.y + 20}>{group.label}</text>
    </g>)}
    {d.edges.map((edge, index) => <g key={index}>
      <path className={`edge ${edge.kind ?? ""}`} d={edge.d} markerEnd={markerFor(id, edge.kind)} />
      {edge.label?.lines.map((line, i) => <text key={line} className="l" x={edge.label!.x} y={edge.label!.y + i * 15}>{line}</text>)}
    </g>)}
    {d.nodes.map(node => <NodeShape key={node.id} node={node} title={node.title} sub={node.sub} x={node.x} y={node.y} w={node.w} h={node.h} />)}
  </svg>;
}

/** Phone layout: rows of 1–3 boxes stacked vertically, with arrows between named boxes. */
function GraphPhone({ d }: { d: GraphDiagram }) {
  const id = `${d.id}-p`;
  const width = 340, gap = 12, boxH = 56, rowGap = 30, labelH = 22;
  const nodes = new Map(d.nodes.map(node => [node.id, node]));
  const placed = new Map<string, { x: number; y: number; w: number; h: number; row: number }>();
  const labels: { y: number; text: string }[] = [];
  let y = 4;
  d.phone.rows.forEach((row, rowIndex) => {
    if (row.label) { labels.push({ y: y + 13, text: row.label.toUpperCase() }); y += labelH; }
    const w = (width - gap * (row.ids.length - 1)) / row.ids.length;
    row.ids.forEach((nodeId, i) => placed.set(nodeId, { x: i * (w + gap), y, w, h: boxH, row: rowIndex }));
    y += boxH + rowGap;
  });
  const height = y - rowGap + 6;
  const path = (from: string, to: string) => {
    const a = placed.get(from)!, b = placed.get(to)!;
    if (a.row === b.row) {
      const [left, right] = a.x < b.x ? [a, b] : [b, a];
      const yy = a.y + a.h / 2;
      return a.x < b.x ? `M${left.x + left.w} ${yy} H${right.x - 2}` : `M${right.x} ${yy} H${left.x + left.w + 2}`;
    }
    const ax = a.x + a.w / 2, bx = b.x + b.w / 2, ay = a.y + a.h, by = b.y - 2;
    if (Math.abs(ax - bx) < 2) return `M${ax} ${ay} V${by}`;
    const mid = ay + (by - ay) / 2;
    return `M${ax} ${ay} V${mid} H${bx} V${by}`;
  };
  return <svg className={`dg dg-phone dg-${d.theme}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={d.alt}>
    <Markers id={id} />
    {labels.map(label => <text key={label.text} className="g" x={0} y={label.y}>{label.text}</text>)}
    {d.phone.links.map(([from, to, kind]) => <path key={`${from}-${to}`} className={`edge ${kind ?? ""}`} d={path(from, to)} markerEnd={markerFor(id, kind)} />)}
    {[...placed].map(([nodeId, box]) => {
      const node = nodes.get(nodeId)!;
      return <NodeShape key={nodeId} node={node} title={node.phone?.title ?? node.title} sub={node.phone?.sub ?? node.sub} {...box} small />;
    })}
  </svg>;
}

/** Splits text into at most two lines of roughly `max` characters. */
function wrap(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const cut = text.lastIndexOf(" ", max);
  return [text.slice(0, cut), text.slice(cut + 1)];
}

/** Sequence of numbered steps. Desktop: text column + lanes with arrows. Phone: an ordered list. */
function Steps({ d }: { d: StepsDiagram }) {
  const id = `${d.id}-s`;
  const textW = 500, laneX0 = 540, laneW = (960 - laneX0) / d.lanes.length, rowH = 48, top = 56;
  const laneX = (lane: number) => laneX0 + laneW * lane + laneW / 2;
  const height = top + d.steps.length * rowH + 12;
  return <>
    <svg className={`dg steps-desk dg-${d.theme}`} viewBox={`0 0 960 ${height}`} role="img" aria-label={d.alt}>
      <Markers id={id} />
      {d.lanes.map((lane, i) => <g key={lane}>
        <rect className="box" x={laneX(i) - laneW / 2 + 6} y={6} width={laneW - 12} height={30} rx={4} />
        <text className="t lane-head" x={laneX(i)} y={26} textAnchor="middle">{lane}</text>
        <path className="edge relation" d={`M${laneX(i)} 36 V${height - 6}`} strokeDasharray="2 4" />
      </g>)}
      {d.steps.map((step, i) => {
        const y = top + i * rowH + rowH / 2;
        const a = laneX(step.from), b = laneX(step.to);
        const self = step.from === step.to;
        const dPath = self ? `M${a} ${y - 8} h22 v16 h-20` : `M${a + (b > a ? 4 : -4)} ${y} H${b + (b > a ? -6 : 6)}`;
        return <g key={i}>
          <circle cx={14} cy={y} r={11} className={step.kind === "data" ? "hot" : "box"} />
          <text className="t" x={14} y={y + 4.5} textAnchor="middle" style={{ fontSize: 12 }}>{i + 1}</text>
          {wrap(step.text, 62).map((line, li, all) => <text key={li} className="s" x={36} y={y + 4 + (li - (all.length - 1) / 2) * 16} style={{ fontSize: 13 }}>{line}</text>)}
          <path className={`edge ${step.kind ?? ""}`} d={dPath} markerEnd={markerFor(id, step.kind)} />
        </g>;
      })}
      <path className="edge relation" d={`M${textW + 20} 8 V${height - 6}`} />
    </svg>
    <ol className="steps-list" aria-label={d.alt}>
      {d.steps.map((step, i) => <li key={i}>
        <span className="n" aria-hidden="true">{i + 1}</span>
        <span><span className="who">{d.lanes[step.from]}{step.from !== step.to ? ` → ${d.lanes[step.to]}` : ""}</span>{step.text}</span>
      </li>)}
    </ol>
  </>;
}

export function Figure({ diagram, number }: { diagram: Diagram; number: number }) {
  return <figure className={`figure figure-${diagram.theme}`}>
    <div className="figure-body">
      {diagram.type === "graph" ? <><GraphDesktop d={diagram} /><GraphPhone d={diagram} /></> : <Steps d={diagram} />}
    </div>
    <figcaption><b>Fig. {number} —</b>{diagram.caption}{diagram.legend && <span className="legend">{diagram.legend}</span>}</figcaption>
  </figure>;
}
