/**
 * Logger module that ONLY writes to stderr.
 *
 * CRITICAL: MCP protocol uses stdout for JSON-RPC messages.
 * Any non-JSON output to stdout corrupts the protocol.
 * All logging MUST go to stderr via console.error().
 */

function formatTimestamp(): string {
  return new Date().toISOString();
}

export function debug(message: string, ...args: unknown[]): void {
  console.error(`[DEBUG] ${formatTimestamp()} ${message}`, ...args);
}

export function info(message: string, ...args: unknown[]): void {
  console.error(`[INFO] ${formatTimestamp()} ${message}`, ...args);
}

export function warn(message: string, ...args: unknown[]): void {
  console.error(`[WARN] ${formatTimestamp()} ${message}`, ...args);
}

export function error(message: string, ...args: unknown[]): void {
  console.error(`[ERROR] ${formatTimestamp()} ${message}`, ...args);
}

export const logger = {
  debug,
  info,
  warn,
  error,
};
