import mongoose from "mongoose";

const connection = {
    connected: false,
};

async function mongoConnect() {
    if (connection.connected) {
        console.info("MongoDB: Database already connected");
        return;
    } else {
        try {
            const connString = process.env.MONGO_URI!;
            const db = await mongoose.connect(connString);

            connection.connected = db.connections[0].readyState === 1;

            console.info("MongoDB: Connected to the database");
        } catch (error) {
            console.error("MongoDB: Error connecting to the database");
            console.error(error);
        }
    }
}

export default mongoConnect;
