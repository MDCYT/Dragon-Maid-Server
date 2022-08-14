import mongoose from "mongoose";

const Record = mongoose.model(
    "records",
    new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
        },
        score: {
            type: String,
            required: true,
            default: "0",
        },
        title: {
            type: String,
            required: true,
            default: "Song",
        },
        dificulty: {
            type: Number,
            required: true,
            default: 0,
        }
    })
);

module.exports = {
    async createRecord({ id, score, title, dificulty }: { id: string, score: string, title: string, dificulty: number }) {
        const record = new Record({
            id,
            score,
            title,
            dificulty,
        });
        return await record.save();
    },

    async getRecordBySongName(songName: string) {
        return await Record.find({ title: songName });
    }
}