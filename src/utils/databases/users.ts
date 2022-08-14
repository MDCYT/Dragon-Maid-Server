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
    async createUser({ username, id, coins, progress, trophies, avatar }: any) {
        const user = new User({
            username,
            id,
            coins,
            progress,
            trophies,
            avatar,
        });
        return await user.save();
    },

    async getUserById(id: string) {
        return await User.findOne({ id });
    },

    async updateUser(id: string, { username, coins, progress, trophies }: { username: string, coins: number, progress: number, trophies: any[] }) {
        return await User.findOneAndUpdate({ id }, { username, coins, progress, trophies, updatedAt: Date.now() });
    },

    async updateUserName(id: string, username: string) {
        return await User.findOneAndUpdate({ id }, { username, updatedAt: Date.now() });
    },

    async updateUserProgress(id: string, progress: number) {
        return await User.findOneAndUpdate({ id }, { progress, updatedAt: Date.now() });
    },

    async updateUserCoins(id: string, coins: number) {
        return await User.findOneAndUpdate({ id }, { coins, updatedAt: Date.now() });
    },

    async getLeaderboard(limit: number, page: number) {
        // Only get the username, coins, progress, trophies, and avatar without the _id, get the top 10 users with the most coins, with limit

        return await User.find({}, { username: 1, coins: 1, progress: 1, trophies: 1, avatar: 1, _id: 0 }).sort({ coins: -1 }).skip((page - 1) * limit).limit(limit);
    }
}