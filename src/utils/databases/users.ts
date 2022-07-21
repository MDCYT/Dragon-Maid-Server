import mongoose from "mongoose";

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            default: "User",
        },
        id: {
            type: String,
            required: true,
            unique: true,
        },
        coins: {
            type: Number,
            required: true,
            default: 0,
        },
        progress: {
            type: Number,
            required: true,
            default: 0,
        },
        trophies: {
            type: Array,
            required: true,
            default: [],
        },
        avatar: {
            type: String,
            required: true,
            default: "https://i.imgur.com/zqErtyB.jpeg",
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    })
);

module.exports = {
    async createUser({ username, id, coins, progress, trophies }: any) {
        const user = new User({
            username,
            id,
            coins,
            progress,
            trophies,
        });
        return await user.save();
    },

    async getUserById(id: string) {
        return await User.findOne({ id: id });
    },

    async updateUser(id:string, { username, coins, progress, trophies }: { username: string, coins: number, progress: number, trophies: any[] }) {
        return await User.findOneAndUpdate({ id: id }, { username, coins, progress, trophies, updatedAt: Date.now() });
    }
}