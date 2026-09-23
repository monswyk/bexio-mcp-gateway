/**
 * Payment-related Zod schemas and types.
 * Domain: Payments
 */

import { z } from "zod";

// List payments for an invoice
export const ListPaymentsParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type ListPaymentsParams = z.infer<typeof ListPaymentsParamsSchema>;

// Get single payment
export const GetPaymentParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
  payment_id: z.number().int().positive(),
});

export type GetPaymentParams = z.infer<typeof GetPaymentParamsSchema>;

// Create payment
export const CreatePaymentParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
  payment_data: z.record(z.unknown()),
});

export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>;

// Delete payment
export const DeletePaymentParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
  payment_id: z.number().int().positive(),
});

export type DeletePaymentParams = z.infer<typeof DeletePaymentParamsSchema>;
