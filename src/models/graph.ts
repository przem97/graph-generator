import Component from "./component";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const schema = new Schema(
    {
        components: { type: Array<Component>, required: true }
    }, 
    { 
        timestamps: true 
    });

type GraphType = InferSchemaType<typeof schema>;

export const GraphModel = mongoose.model('graph', schema);