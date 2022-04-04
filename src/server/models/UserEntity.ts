import Sequelize from "sequelize";
import db from "./config/database";

export default db.define("users", {
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_role: {
        type: Sequelize.STRING
    }
});