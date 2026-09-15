import { redirect } from "next/navigation";

// The root route has no standalone landing page — Login is the default
// entry point into the app until real route protection/session handling
// is implemented.
export default function RootPage() {
  redirect("/auth/login");
}
