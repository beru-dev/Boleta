import Sequelize from "sequelize";
import db from "./config/database";

export default db.define("projects", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});