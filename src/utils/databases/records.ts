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

    getAllSongs() {
        class Song {
            id: string;
            name: string;
            coverImage: string;

            constructor(id: string, name: string, coverImage: string) {
                this.id = id;
                this.name = name;
                this.coverImage = coverImage;
            }
        }

        const songsArray = [
            new Song("Tutorial", "Tutorial", "/img/covers/default.png"),
            new Song("serva", "Serva", "/img/covers/default.png"),
            new Song("scaled", "Scaled", "/img/covers/default.png"),
            new Song("electro_trid3nt", "Electro Trid3nt", "/img/covers/default.png"),
            new Song("killer-scream", "Killer Scream", "/img/covers/default.png"),
            new Song("burn-it-all", "Burn it All", "/img/covers/default.png")
        ];

        return songsArray;
    },

    getSongInfo(id: string) {
        // tslint:disable-next-line: max-classes-per-file
        class Song {
            id: string;
            name: string;
            coverImage: string;

            constructor(id: string, name: string, coverImage: string) {
                this.id = id;
                this.name = name;
                this.coverImage = coverImage;
            }
        }

        const songsArray = [
            new Song("Tutorial", "Tutorial", "/img/covers/default.png"),
            new Song("serva", "Serva", "/img/covers/default.png"),
            new Song("scaled", "Scaled", "/img/covers/default.png"),
            new Song("electro_trid3nt", "Electro Trid3nt", "/img/covers/default.png"),
            new Song("killer-scream", "Killer Scream", "/img/covers/default.png"),
            new Song("burn-it-all", "Burn it All", "/img/covers/default.png")
        ];

        return songsArray.find(song => song.id === id);
    },

    async getRecord(id: string, dificulty: string = "0") {
        return await Record.find({ songID: id, dificulty }).sort({ score: -1 });
    }
}