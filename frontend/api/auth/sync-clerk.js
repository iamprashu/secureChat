import { verifyClerkToken } from "../../../backend/src/middleware/clerkAuth.js";
import { syncClerkUser } from "../../../backend/src/controllers/auth.controller.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await verifyClerkToken(req, res, async () => {
      await syncClerkUser(req, res);
    });
  } catch (error) {
    console.error("API route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
