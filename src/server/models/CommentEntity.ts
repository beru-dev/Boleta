import Sequelize from "sequelize";
import db from "./config/database";

export default db.define("comments", {
    comment: {
        type: Sequelize.STRING
    }
});