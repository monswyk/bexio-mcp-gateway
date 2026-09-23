/**
 * McpError class for standardized error handling.
 * Error messages include recovery suggestions for LLM self-correction.
 */

export type McpErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "BEXIO_API_ERROR"
  | "INTERNAL_ERROR";

export class McpError extends Error {
  readonly code: McpErrorCode;
  readonly details?: Record<string, unknown>;
  readonly statusCode?: number;

  constructor(
    code: McpErrorCode,
    message: string,
    details?: Record<string, unknown>,
    statusCode?: number
  ) {
    super(message);
    this.name = "McpError";
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
  }

  /** Resource not found - suggests listing resources first */
  static notFound(resource: string, id: string | number): McpError {
    return new McpError(
      "NOT_FOUND",
      `${resource} with ID ${id} not found. Try listing ${resource.toLowerCase()}s first to find valid IDs.`,
      { resource, id }
    );
  }

  /** Validation error - includes specific field issues */
  static validation(message: string, details?: Record<string, unknown>): McpError {
    return new McpError(
      "VALIDATION_ERROR",
      `Validation failed: ${message}. Check the required fields and their formats.`,
      details
    );
  }

  /** Bexio API error - includes status and recovery suggestions */
  static bexioApi(
    message: string,
    statusCode?: number,
    details?: Record<string, unknown>
  ): McpError {
    let suggestion = "";
    if (statusCode === 401) {
      suggestion = " Check that BEXIO_API_TOKEN is valid and not expired.";
    } else if (statusCode === 403) {
      suggestion = " The API token may lack permissions for this operation.";
    } else if (statusCode === 429) {
      suggestion = " Rate limit exceeded. Wait a moment before retrying.";
    } else if (statusCode && statusCode >= 500) {
      suggestion = " Bexio server error. Retry the request in a few seconds.";
    }

    return new McpError(
      "BEXIO_API_ERROR",
      `Bexio API error: ${message}.${suggestion}`,
      details,
      statusCode
    );
  }

  /** Internal server error */
  static internal(message: string, details?: Record<string, unknown>): McpError {
    return new McpError(
      "INTERNAL_ERROR",
      `Internal error: ${message}. Please report this issue.`,
      details
    );
  }

  /** Convert to plain object for JSON serialization */
  toJSON(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      statusCode: this.statusCode,
    };
  }
}
