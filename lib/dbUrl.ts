const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const dbname = "stravadb";

const url = `mongodb+srv://${username}:${password}@cluster0.3f9kc.mongodb.net/${dbname}?retryWrites=true&w=majority`;
export default url;
