/** Generates a random 6-digit string, used for the mock "verification code" step in the forgot-password flow. */
export function generateDemoCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
