import * as z from "zod";
import { EAuthValidationCredentials } from "@royalfut/enums";

/**
 * Zod schema for validating EA Auth credentials.
 *
 * Password validation:
 * - Minimum length: defined by `EAuthValidationCredentials.MIN_PASSWORD_LENGTH`
 * - Maximum length: defined by `EAuthValidationCredentials.MAX_PASSWORD_LENGTH`
 * - Contains at least one lowercase letter
 * - Contains at least one uppercase letter
 * - Contains at least one number
 *
 * @type {z.ZodSchema<string>}
 */
export const ZEAPasswordValidation = z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(EAuthValidationCredentials.MIN_PASSWORD_LENGTH, {
        message: `Password must be at least ${EAuthValidationCredentials.MIN_PASSWORD_LENGTH} characters long.`,
    })
    .max(EAuthValidationCredentials.MAX_PASSWORD_LENGTH, {
        message: `Password cannot exceed ${EAuthValidationCredentials.MAX_PASSWORD_LENGTH} characters.`,
    })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .refine(value => !/\s/.test(value), {
        message: "Password contains an unsupported character (spaces).",
    });

/**
 * Zod schema for validating email addresses.
 *
 * Validation rules:
 * - Must be a non-empty string.
 * - Must conform to a valid email address format.
 *
 * @typedef {object} ZEmailValidation
 * @property {string} email - The email address to validate.
 */
export const ZEmailValidation = z
    .string()
    .min(1, "Please enter your email address.")
    .email({ message: "Invalid email address." });
