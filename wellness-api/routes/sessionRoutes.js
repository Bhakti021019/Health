const express = require("express");
const router = express.Router();
const {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getMySessions,
  getMySessionById,
  saveDraftSession,
  publishSession,
  deleteMySession, // ✅ Make sure this exists in sessionController
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getSessions);

// ✅ User-specific (protected) routes — must come BEFORE "/:id"
router.get("/my-sessions", protect, getMySessions);
router.get("/my-sessions/:id", protect, getMySessionById);
// router.post("/my-sessions/save-draft", protect, saveDraftSession);
// router.post("/my-sessions/publish", protect, publishSession);
router.put("/my-sessions/:id", protect, updateSession);
router.delete("/my-sessions/:id", protect, deleteMySession);

// Public session by ID (must come AFTER /my-sessions)
router.get("/:id", getSessionById);

// CRUD (sessions creation, update, delete)
router.post("/", protect, createSession);
router.put("/:id", protect, updateSession);
router.delete("/:id", protect, deleteSession);

module.exports = router;
