import mongoose from "mongoose";

export async function CONNECT_DB() {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const state = mongoose.connection.readyState;

    // 1. If already connected, stop here.
    if (state === 1) {
        console.log("✅ Already connected to DB");
        return;
    }

    // 2. If connecting, wait (optional, but good practice)
    if (state === 2) {
        console.log("⏳ Connecting...");
        return;
    }

    try {
        const { PASSWORD } = process.env;       
        const MONGODB_URI = "mongodb://theajayrawat:" + PASSWORD + "@ac-wlalrjt-shard-00-00.uivvy1k.mongodb.net:27017,ac-wlalrjt-shard-00-01.uivvy1k.mongodb.net:27017,ac-wlalrjt-shard-00-02.uivvy1k.mongodb.net:27017/weight-tract-db?replicaSet=atlas-5j1j3l-shard-0&ssl=true&authSource=admin";
        
        // 3. Connect
        await mongoose.connect(MONGODB_URI);
        console.log("🚀 New DB Connection Established");
        
    } catch (error) {
        console.error("❌ DB Connection Error:", error);
        throw new Error("Database connection failed");
    }
}