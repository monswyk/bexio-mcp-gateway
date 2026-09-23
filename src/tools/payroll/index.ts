/**
 * Payroll domain module.
 * Exports tool definitions and handlers for payroll operations.
 *
 * CONDITIONAL MODULE: Payroll requires a Bexio subscription with payroll features.
 * All handlers check module availability on first call using probe pattern.
 * When unavailable, returns friendly error with upgrade instructions.
 *
 * PAY-01: Employees - 4 tools (list, get, create, update)
 * PAY-02: Absences - 5 tools (list, get, create, update, delete)
 * PAY-03: Payroll Documents - 1 tool (list)
 *
 * Total: 10 tools
 */

export { toolDefinitions } from "./definitions.js";
export { handlers } from "./handlers.js";
