import { Redis } from "@upstash/redis";

const connection = {
    connected: false,
};

function upstashConnect() {
    if (connection.connected) {
        console.info("Upstash: Redis database already connected");
        return;
    } else {
        try {
            const upstashURI = process.env.UPSTASH_URI!;
            const upstashPassword = process.env.UPSTASH_PASSWORD!;

            const redis = new Redis({
                url: upstashURI,
                token: upstashPassword,
            });

            console.info("Upstash: Connected to the redis database");

            return redis;
        } catch (error) {
            console.error("Error connecting to the redis database");
            console.error(error);
        }
    }
}

export default upstashConnect;
