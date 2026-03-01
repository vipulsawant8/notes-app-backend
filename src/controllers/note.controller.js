import asyncHandler from 'express-async-handler';

import Note from '../models/notes.model.js';
import ApiError from '../utils/ApiError.js';
import ERRORS from '../constants/errors.js';

const fetchNotes = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("fetchNotes controller");
	}

	const user = req.user;

	const page = req.query.page;
	const limit = 10;

	if (process.env.NODE_ENV === "development") {
		console.log("req.params :", req.params);
		
		console.log("page :", page);
		console.log("limit :", limit);
	}

	const filter = { authorID: user._id };

	const options = {
		limit,
		page,
		sort: { pinned: -1, updatedAt: -1 }
	};

	const result = await Note.paginate(filter, options);
	return res.status(200).json({
		message: "Notes fetched successfully",
		data: result,
		success: true
	})
} );

const newNote = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("newNote controller");
		console.log("body :", req.body);
	}

	const user = req.user;

	const title = req.body.title?.trim();
	const content = req.body.content?.trim();

	const existingNote = await Note.findOne({ authorID: user._id, title });
	if (existingNote) throw new ApiError(400, ERRORS.NOTE_ALREADY_EXISTS);

	const note = await Note.create({ authorID: user._id, title, content });

	const response = { statusCode: 201, message:`"${note.title}" was created`, data: note };
	return res.status(response.statusCode).json(response);
});

const updateNote = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("updateNote controller");
		console.log("body :", req.body);
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const noteID = req.params.id;

	const title = req.body.title?.trim();
	const content = req.body.content?.trim();

	const note = await Note.findOneAndUpdate({ authorID: user._id, _id: noteID }, { title, content }, { new: true }).lean();

	if (!note) throw new ApiError(404, ERRORS.NOTE_NOT_FOUND);

	const response = { statusCode: 200, message: `"${note.title}" was updated`, data: note };
	return res.status(response.statusCode).json(response);
});

const deleteNote = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("deleteNote controller");
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const noteID = req.params.id;
	
	const note = await Note.findOneAndDelete({ _id: noteID, authorID: user._id }).lean();
	if (!note) throw new ApiError(404, ERRORS.NOTE_NOT_FOUND);

	const response = { statusCode: 200, message: `"${note.title}" was deleted`, data: note }

	return res.status(response.statusCode).json(response);
} );

const updatePin = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("updatePin controller");
		console.log("body :", req.body);
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const noteID = req.params.id;
	
	const pin = req.body.status;

	const pinCount = await Note.countDocuments({ authorID: user._id, pinned: true });

	if (pin && pinCount >=3) throw new ApiError(400, ERRORS.NOTE_PIN_LIMIT);

	const note = await Note.findOneAndUpdate({ authorID: user._id, _id: noteID }, { pinned: pin }, { new: true }).lean();

	if (!note) throw new ApiError(404, ERRORS.NOTE_NOT_FOUND);

	const response = { statusCode: 200, message: `"${note.title}" was ${ pin ? "Pinned" : "Unpinned"}`, data: note };
	return res.status(response.statusCode).json(response);
});

export { fetchNotes, newNote, updateNote, deleteNote, updatePin };