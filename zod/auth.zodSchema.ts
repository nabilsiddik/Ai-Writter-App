/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const UserRoleEnum = z.enum(["USER", "ADMIN", 'SUPER_ADMIN']);
export const SubscriptionStatusEnum = z.enum(["NONE", "MONTHLY", "YEARLY"]);
export const UserStatusEnum = z.enum(["ACTIVE", "BLOCKED", "DELETED"]);
export const Gender = z.enum(["MALE", "FEMALE", "OTHERS"]);

// patient creation input zod schema
export const registerUserZodSchema = z.object({
    fullName: z
        .string('Full Name is Required')
        .min(2, "Full Name must be at least 2 characters"),
    email: z
        .string()
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
})


export const updateUserProfileZodSchema = z.object({
    firstName: z.string('First Name is required').min(2, { message: "First must be at least 2 characters." }),
    lastName: z.string('Last Name is required').min(2, { message: "Last Name must be at least 2 characters." }),
    bio: z.string().max(300, { message: "Bio must be under 300 characters." }).optional(),
    currentLocation: z.string().max(100, { message: "Location must be under 100 characters." }).optional(),
    interests: z.string().optional(),
    visitedCountries: z.string().optional(),
});


export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});