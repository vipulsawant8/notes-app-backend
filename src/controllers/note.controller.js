import asyncHandler from 'express-async-handler';
import { Types } from 'mongoose';

import Note from '../models/notes.model.js';
import ApiError from '../utils/ApiError.js';

const fetchNotes = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("fetchNotes controller");
	}

	const user = req.user;

	const page = Math.max(1, parseInt(req.params.page, 10) || 1);
	const limit = 10;

	const filter = { authorID: user._id };

	const options = {
		limit,
		page,
		sort: { pinned: -1, updatedAt: -1 }
	};

	const result = await Note.paginate(filter, options);
	
	if (process.env.NODE_ENV === "development")  console.log("result: ", result);

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
	const pinned = req.body.pinned ? req.body.pinned : false;

	if (!title) throw new ApiError(400, "Please add a title to your note");

	const existingNote = await Note.findOne({ authorID: user._id, title });
	if (existingNote) throw new ApiError(400, "Note title already exists for this user");

	const note = await Note.create({ userID: user._id, title, content, pinned });

	const response = { statusCode: 201, message:"Note created successfully", data: note };
	return res.status(response.statusCode).json(response);
});

const updateNote =  asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("updateNote controller");
		console.log("body :", req.body);
		console.log('req.params :', req.params);
	}

	const noteID = req.params.id;

	const title = req.body.title?.trim();
	const content = req.body.content?.trim();
	const pinned = req.body.pinned ? req.body.pinned : false;
	
	if (!Types.ObjectId.isValid(noteID)) throw new ApiError(400, "Invalid Note ID");

	const note = await Note.findOneAndUpdate({ authorID: user._id, _id: noteID }, { title, content, pinned }, { new: true }).lean();

	if (!note) throw new ApiError(404, "Not Not Found");

	const response = { statusCode: 200, message: "Note Updated Successfully", data: note };
	return res.status(response.statusCode).json(response);
});

const deleteNote = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("deleteNote controller");
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const noteID = req.params.id;
	
	if (!Types.ObjectId.isValid(noteID)) throw new ApiError(400, "Invalid Note ID");
	
	const note = await Note.findOneAndDelete({ _id: taskID, userID: user._id }).lean();
	if (!note) throw new ApiError(404, "Note not found");

	const response = { statusCode: 200, message: "Note Deleted Successfully", data: note }

	return res.status(response.statusCode).json(response);
} );

export { fetchNotes, newNote, updateNote, deleteNote };