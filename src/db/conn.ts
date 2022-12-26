
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config()
                                                                                                                                   
const url = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@largeee.yqskbyb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err: any) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

export default client