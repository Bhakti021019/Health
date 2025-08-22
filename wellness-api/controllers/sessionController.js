const Session = require("../models/sessionModel");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * ===========================
 * PUBLIC ROUTES
 * ===========================
 */

// @desc    Get all published sessions (public wellness sessions)
// @route   GET /api/sessions
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ status: "published" }); // only published for public
    successResponse(res, sessions);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single published session
// @route   GET /api/sessions/:id
exports.getSessionById = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      status: "published",
    });
    if (!session) return errorResponse(res, "Session not found", 404);
    successResponse(res, session);
  } catch (err) {
    next(err);
  }
};

/**
 * ===========================
 * USER ROUTES (protected)
 * ===========================
 */

// @desc    Get logged-in user's sessions (draft + published)
// @route   GET /api/sessions/my-sessions
exports.getMySessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    successResponse(res, sessions);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single logged-in user's session
// @route   GET /api/sessions/my-sessions/:id
exports.getMySessionById = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session) return errorResponse(res, "Session not found", 404);
    successResponse(res, session);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a user's session
// @route   DELETE /api/sessions/my-sessions/:id
exports.deleteMySession = async (req, res, next) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session) return errorResponse(res, "Session not found", 404);
    successResponse(res, { message: "Session deleted" });
  } catch (err) {
    next(err);
  }
};

/**
 * ===========================
 * CRUD ROUTES (protected)
 * ===========================
 */

// @desc    Create a new session (default draft)
// @route   POST /api/sessions
exports.createSession = async (req, res, next) => {
  try {
    const { title, json_file_url, tags, status = "draft" } = req.body;

    if (!tags || tags.length === 0) {
      return errorResponse(res, "At least one tag is required", 400);
    }

    const newSession = new Session({
      title,
      json_file_url,
      tags,
      status,
      user_id: req.user.id,
    });

    const session = await newSession.save();
    successResponse(res, session, 201);
  } catch (err) {
    next(err);
  }
};

// @desc    Update an existing session (draft or publish)
// @route   PUT /api/sessions/:id
exports.updateSession = async (req, res, next) => {
  try {
    const { tags } = req.body;

    if (tags && tags.length === 0) {
      return errorResponse(res, "At least one tag is required", 400);
    }

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, // ✅ ensures only owner can update
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );

    if (!session) return errorResponse(res, "Session not found", 404);
    successResponse(res, session);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a session (admin or generic protected)
// @route   DELETE /api/sessions/:id
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return errorResponse(res, "Session not found", 404);
    successResponse(res, { message: "Session deleted" });
  } catch (err) {
    next(err);
  }
};
