import fs from "fs";
import dotenv from "dotenv";

const PROPS_FILE = "secrets.properties";

export default () => {
    dotenv.config();

    if(!fs.existsSync(PROPS_FILE)) {
        console.error("Properties file not found.");
        return
    }

    const props = dotenv.parse(fs.readFileSync(PROPS_FILE));
    for(const prop in props) {
        process.env[prop] = props[prop];
    }
}
