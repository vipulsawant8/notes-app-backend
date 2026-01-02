import asyncHandler from 'express-async-handler';
import { Types } from 'mongoose';

import Note from '../models/notes.model.js';
import ApiError from '../utils/ApiError.js';

const fetchNotes = asyncHandler( async (req, res) => {
	console.log("req.params :", req.params);

	if (process.env.NODE_ENV === "development") {

		console.log("fetchNotes controller");
	}

	const user = req.user;

	const page = Math.max(1, Number(req.query.page) || 1);
	const limit = 12;

	if (process.env.NODE_ENV === "development") {
		
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
	
	// if (process.env.NODE_ENV === "development")  console.log("result: ", result);

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

	if (!title) throw new ApiError(400, "Please add a title to your note");

	const existingNote = await Note.findOne({ authorID: user._id, title });
	if (existingNote) throw new ApiError(400, "Note title already exists for this user");

	const note = await Note.create({ authorID: user._id, title, content });

	const response = { statusCode: 201, message:"Note created successfully", data: note };
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
	
	if (!Types.ObjectId.isValid(noteID)) throw new ApiError(400, "Invalid Note ID");

	const note = await Note.findOneAndUpdate({ authorID: user._id, _id: noteID }, { title, content }, { new: true }).lean();

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
	
	const note = await Note.findOneAndDelete({ _id: noteID, authorID: user._id }).lean();
	if (!note) throw new ApiError(404, "Note not found");

	const response = { statusCode: 200, message: "Note Deleted Successfully", data: note }

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

	if (!Types.ObjectId.isValid(noteID)) throw new ApiError(400, "Invalid Note ID");

	const pinCount = await Note.countDocuments({ authorID: user._id, pinned: true });

	if (pin && pinCount >=3) throw new ApiError(400, "You can only pin 3 documents");

	const note = await Note.findOneAndUpdate({ authorID: user._id, _id: noteID }, { pinned: pin }, { new: true }).lean();

	if (!note) throw new ApiError(404, "Not Not Found");

	const response = { statusCode: 200, message: `Note ${ pin ? "Pinned" : "Unpinned"} Successfully`, data: note };
	return res.status(response.statusCode).json(response);
});

export { fetchNotes, newNote, updateNote, deleteNote, updatePin };