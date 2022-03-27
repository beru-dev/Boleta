import { Sequelize } from "sequelize";

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_URL, DB_PORT } = process.env;

export default POSTGRES_DB ?
    // new Sequelize(`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_URL}:${DB_PORT}/${POSTGRES_DB}?sslmode=require`)
    // :
    new Sequelize(
        POSTGRES_DB || "",
        POSTGRES_USER || "",
        POSTGRES_PASSWORD || "",
        {
            host: DB_URL,
            port: parseInt(DB_PORT || "5432"),
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        }
    ) :
    new Sequelize({
        dialect: "sqlite",
        storage: "localdb.db"
    });