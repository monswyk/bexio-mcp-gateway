/**
 * Which write actions a gateway client may call.
 * Read tools (list, get, search, …) are always available.
 * "update" also covers state changes such as issue, send, mark, and edit.
 */

export interface ClientPermissions {
  create: boolean;
  update: boolean;
  delete: boolean;
}

export const FULL_PERMISSIONS: ClientPermissions = { create: true, update: true, delete: true };

const UPDATE_PREFIX =
  /^(update_|edit_|issue_|mark_|send_|accept_|decline_|cancel_|archive_|unarchive_|revert_|reissue_|restore_)/;

export type ToolAction = "read" | "create" | "update" | "delete";

/** Classify a tool name. Unknown names stay readable. */
export function toolAction(name: string): ToolAction {
  if (name.startsWith("delete_")) return "delete";
  if (UPDATE_PREFIX.test(name)) return "update";
  if (name.startsWith("create_") || name.startsWith("bulk_create_") || name.startsWith("upload_") || name.startsWith("copy_")) {
    return "create";
  }
  return "read";
}

export function toolAllowed(name: string, permissions: ClientPermissions): boolean {
  const action = toolAction(name);
  if (action === "read") return true;
  return permissions[action];
}

/** Missing `allow` means every action. An explicit object must name all three as booleans. */
export function parsePermissions(value: unknown, clientName: string): ClientPermissions {
  if (value === undefined) return { ...FULL_PERMISSIONS };
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`clients.json: "${clientName}".allow must be an object with create, update, and delete.`);
  }
  const raw = value as Record<string, unknown>;
  const permissions = {} as ClientPermissions;
  for (const key of ["create", "update", "delete"] as const) {
    if (typeof raw[key] !== "boolean") {
      throw new Error(`clients.json: "${clientName}".allow.${key} must be true or false.`);
    }
    permissions[key] = raw[key];
  }
  return permissions;
}
