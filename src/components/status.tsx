import { statusLabels, type StatusKind } from "@/data/site";

export function Status({ kind, text }: { kind: StatusKind; text?: string }) {
  return <span className={`chip chip-${kind}`}>{text ?? statusLabels[kind]}</span>;
}
