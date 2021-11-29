const { Schema, model, Types } = require("mongoose");

const Channel = new Schema(
	{
		name: { type: String, required: true, index: true },
		topic: { type: String, required: true },
		type: {
			type: String,
			enum: ["QUERY", "DISCUSSION"],
			default: "DISCUSSION",
		},
		room: { type: Types.ObjectId, ref: "Room", index: true },
		createdBy: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Channel", Channel);