export function errorMessage(error: unknown): string | null {
  if (!error) return null;
  const candidate = error as { shortMessage?: string; message?: string };
  const message = candidate.shortMessage ?? candidate.message ?? "Something went wrong";
  const firstLine = message.split("\n")[0]?.trim() ?? message;
  return firstLine.length > 160 ? `${firstLine.slice(0, 157)}…` : firstLine;
}
