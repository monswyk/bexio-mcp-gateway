/**
 * Report-related Zod schemas and types.
 * Domain: Reports and Business Intelligence
 */

import { z } from "zod";

// Date validation regex
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateMessage = "Date must be in YYYY-MM-DD format";

// Revenue report
export const GetRevenueReportParamsSchema = z.object({
  start_date: z.string().regex(dateRegex, dateMessage),
  end_date: z.string().regex(dateRegex, dateMessage),
  group_by: z.string().optional(),
});

export type GetRevenueReportParams = z.infer<
  typeof GetRevenueReportParamsSchema
>;

// Customer revenue report
export const GetCustomerRevenueReportParamsSchema = z.object({
  start_date: z.string().regex(dateRegex, dateMessage),
  end_date: z.string().regex(dateRegex, dateMessage),
  limit: z.number().int().positive().default(10),
});

export type GetCustomerRevenueReportParams = z.infer<
  typeof GetCustomerRevenueReportParamsSchema
>;

// Invoice status report
export const GetInvoiceStatusReportParamsSchema = z.object({
  start_date: z.string().regex(dateRegex, dateMessage),
  end_date: z.string().regex(dateRegex, dateMessage),
});

export type GetInvoiceStatusReportParams = z.infer<
  typeof GetInvoiceStatusReportParamsSchema
>;

// Monthly revenue report
export const GetMonthlyRevenueReportParamsSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  month: z.number().int().min(1).max(12),
});

export type GetMonthlyRevenueReportParams = z.infer<
  typeof GetMonthlyRevenueReportParamsSchema
>;

// Top customers by revenue
export const GetTopCustomersByRevenueParamsSchema = z.object({
  limit: z.number().int().positive().default(10),
  start_date: z.string().regex(dateRegex, dateMessage).optional(),
  end_date: z.string().regex(dateRegex, dateMessage).optional(),
});

export type GetTopCustomersByRevenueParams = z.infer<
  typeof GetTopCustomersByRevenueParamsSchema
>;
