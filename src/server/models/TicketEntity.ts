import Sequelize from "sequelize";
import db from "./config/database";

export default db.define("tickets", {
    ticket_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ticket_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ticket_priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    story_points: {
        type: Sequelize.INTEGER
    },
    ticket_description: {
        type: Sequelize.STRING
    }
});