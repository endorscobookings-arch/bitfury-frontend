// Base URL for the backend API.
//
// - In dev, requests to /api/* are proxied to the backend (see vite.config.ts),
//   so leave VITE_API_URL unset and this resolves to an empty string.
// - In production, set VITE_API_URL to the deployed backend URL at build time.
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";
