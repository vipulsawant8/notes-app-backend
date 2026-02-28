const ERRORS = {
	// AUTHENTICATION
	INVALID_CREDENTIALS: "Invalid email or password.",
	UNAUTHORIZED: "Unauthorized access.",
	TOKEN_EXPIRED: "Token expired, please login again.",
	TOKEN_INVALID: "Invalid token.",
	TOKEN_MISSING: "Token missing.",
	EMAIL_NOT_VERIFIED: "Please verify your email first.",
	INVALID_VERIFICATION_REQUEST: "Invalid verification request.",
	INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token.",
	DEVICE_ID_INVALID: "Invalid request. Device identifier is missing or malformed.",
	SESSION_INVALID: "Session is invalid or has expired.",

	// USER
	USER_NOT_FOUND: "User not found.",
	EMAIL_ALREADY_EXISTS: "An account with this email already exists. Try logging in.",

	// NOTE
	NOTE_NOT_FOUND: "Note not found",
	NOTE_DATA_REQUIRED: "Note title required",
	NOTE_ALREADY_EXISTS: "You already have a Note with this title in your account",
	NOTE_NOT_IDENTIFIED: "Unable to edit or delete note. The note could not be identified.",
	NOTE_PIN_LIMIT: "You can pin up to 3 documents only.",

	// PASSWORD
	CURRENT_PASSWORD_INCORRECT: "Current password is incorrect.",
	PASSWORD_TOO_SHORT: "Password must be at least 6 characters long.",
	PASSWORD_SAME_AS_OLD: "New password cannot be the same as the current password.",
	PASSWORD_RESET_EMAIL_SENT: "If an account with that email exists, a reset link has been sent.",

	// GENERAL
	INVALID_ID: "Invalid ID.",
	VALIDATION_FAILED: "Validation failed.",
	BAD_REQUEST: "Bad request.",
	INTERNAL_ERROR: "Internal server error.",
	MISSING_FIELDS: "Required fields missing.",
	DUPLICATE_DATA: "Duplicate data exists.",
	INVALID_JSON: "Invalid JSON payload.",

};

export default ERRORS;