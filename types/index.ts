/**
 * Shared type definitions for HypeShelf.
 * Import from this file to keep types consistent across frontend and backend.
 */

/** User roles in the system. Only "admin" gets elevated privileges. */
export type UserRole = "user" | "admin";

/** Recommendation genres supported by the platform. */
export type Genre =
    | "Action"
    | "Comedy"
    | "Drama"
    | "Horror"
    | "Sci-Fi"
    | "Documentary"
    | "Other";

export const GENRES: Genre[] = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Documentary",
    "Other",
];
