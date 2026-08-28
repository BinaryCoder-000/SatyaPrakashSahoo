export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

export function padIndex(value: number): string {
  return String(value).padStart(2, "0");
}

export function dash(value?: string | number): string {
  if (value === undefined || value === "") return "—";
  return String(value);
}
