import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    postBody: {
      type: String,
      required: true,
    },

    postImage: {
      type: String,
    },

    likes: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        
        postCreatorId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },

        createdAt: {
          type: Date,
          default: Date.now, // Automatically set createdAt to the current date and time
        },
      },
    ],
		
    postCreator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: "__v", // Enable versioning with `__v`
    timestamps: true, // Enable `createdAt` and `updatedAt` timestamps
  }
);

// Pre-save middleware to control when `__v` and `updatedAt` are updated
postSchema.pre("save", function (next) {
	if (this.isModified("title") || this.isModified("postBody")) {
		// Update `updatedAt` and increment `__v` only if `title` or `postBody` is modified
		this.increment(); // Triggers the increment of `__v`
		this.updatedAt = Date.now(); // Updates `updatedAt` timestamp
	}
	next();
});

// Pre-findOneAndUpdate middleware to ensure `__v` and `updatedAt` work similarly
postSchema.pre("findOneAndUpdate", function (next) {
	const update = this.getUpdate();

	if (update.title || update.postBody) {
		// If `title` or `postBody` are being updated, increment `__v` and `updatedAt`
		update.$inc = update.$inc || {}; // Ensure `$inc` object exists
		update.$inc.__v = 1; // Increment `__v`
		update.updatedAt = Date.now(); // Set `updatedAt` to current date
	} else {
		// Prevent `updatedAt` and `__v` changes when only `likes` is modified
		this.setOptions({ timestamps: false });
	}
	next();
});

// Create the model
export const Post = mongoose.model("Post", postSchema);
