import { createClient } from "redis";

const redis = createClient({
  url: "redis://localhost:6379",
  database: 1  
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

await redis.connect();

console.log("Connected to Redis database 1 (chat-app)");

export default redis;
