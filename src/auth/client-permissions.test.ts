import { describe, expect, it } from "vitest";
import { toolAction, toolAllowed, type ClientPermissions } from "./client-permissions.js";

const readOnly: ClientPermissions = { create: false, update: false, delete: false };

describe("toolAction", () => {
  it.each([
    ["list_invoices", "read"],
    ["get_invoice_pdf", "read"],
    ["search_contacts", "read"],
    ["ping", "read"],
    ["create_invoice", "create"],
    ["bulk_create_contacts", "create"],
    ["upload_file", "create"],
    ["copy_quote", "create"],
    ["update_contact", "update"],
    ["edit_item", "update"],
    ["issue_invoice", "update"],
    ["send_invoice", "update"],
    ["mark_invoice_as_sent", "update"],
    ["delete_invoice", "delete"],
  ] as const)("%s is %s", (name, action) => {
    expect(toolAction(name)).toBe(action);
  });
});

describe("toolAllowed", () => {
  it("always allows reads and blocks the writes that are off", () => {
    expect(toolAllowed("list_invoices", readOnly)).toBe(true);
    expect(toolAllowed("create_invoice", readOnly)).toBe(false);
    expect(toolAllowed("issue_invoice", readOnly)).toBe(false);
    expect(toolAllowed("delete_invoice", readOnly)).toBe(false);
    expect(toolAllowed("delete_invoice", { ...readOnly, delete: true })).toBe(true);
  });
});
