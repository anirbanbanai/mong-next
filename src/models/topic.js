// const { Schema, default: mongoose } = require("mongoose");
import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
    name: String,
    email: String,
    des: String
},
{
    timestamps: true,
}
);

const Topic = mongoose.models.Gopic || mongoose.model("Gopic", topicSchema);

export default Topic;