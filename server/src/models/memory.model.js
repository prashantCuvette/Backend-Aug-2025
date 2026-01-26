import { Schema, model } from "mongoose";

const memorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,

        },
        description: {
            type: String,
            required: true,
            trim: true,

        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        imagePublidId: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const MemoryModel = model("memory", memorySchema);

export default MemoryModel;