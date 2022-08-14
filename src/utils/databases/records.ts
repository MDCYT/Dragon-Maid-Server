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
        songID: {
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
    async createRecord({ id, score, songID, dificulty }: { id: string, score: string, songID: string, dificulty: number }) {
        const record = new Record({
            id,
            score,
            songID,
            dificulty,
        });
        return await record.save();
    },

    async getRecordBysongID(songID: string) {
        return await Record.find({ songID });
    },

    async getRecordByIdandSongID(id: string, songID: string) {
        return await Record.findOne({ id, songID }) || null;
    },

    async updateRecord(id: string, { score, songID, dificulty }: { score: string, songID: string, dificulty: number }) {
        if(await this.getRecordByIdandSongID(id, songID)) {
            await Record.updateOne({ id, songID }, { score, songID, dificulty });
        } else {
            await this.createRecord({ id, score, songID, dificulty });
        }

        return;
    },
}