import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const notesSchema = new Schema({

	authorID: {
		type: Types.ObjectId,
		require:true,
		ref: "User"
	},

	title: {
		
		type: String,
		require: true,
		trim: true
	},

	content: {
		
		type: String,
		default: ""
	},

	pinned: {

		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

notesSchema.plugin(mongoosePaginate);

notesSchema.index({ title: 1, authorID: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });
notesSchema.index({ pinned: -1 });
notesSchema.index({ updatedAt: -1 });

const Note = model('Note', notesSchema);

export default Note;