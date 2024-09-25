import mongoose, { Schema } from "mongoose";

const HistorySchema = new Schema(
    {
        title: { type: String, required: [true, "Title is required"] },
        query: { type: String, required: [true, "Query is required"] },
        response: { type: String, required: [true, "Response is required"] },
        user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    },
    { timestamps: true },
);

// Add virtual fields
HistorySchema.virtual("id").get(function () {
    return this._id.toHexString();
});

HistorySchema.virtual("userId").get(function () {
    return this.user.toHexString();
});

HistorySchema.virtual("createdOn").get(function () {
    return new Date(this.createdAt).getTime() / 1000;
});
HistorySchema.virtual("updatedOn").get(function () {
    return new Date(this.updatedAt).getTime() / 1000;
});

// Ensure virtual fields are serialised.
HistorySchema.set("toJSON", {
    virtuals: true,
});

HistorySchema.set("toObject", {
    virtuals: true,
});

const HistoryModel = mongoose.model("Todos", HistorySchema);

export default HistoryModel;
