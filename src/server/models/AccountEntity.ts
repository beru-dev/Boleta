import Sequelize from "sequelize";
import db from "./config/database";

export default db.define("account", {
    account_name: {
        type: Sequelize.STRING
    },
    plan_level: {
        type: Sequelize.STRING
    }
});

