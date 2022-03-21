import { Sequelize } from "sequelize";

export default process.env.POSTGRES_DB ?
    new Sequelize(
        process.env.POSTGRES_DB || "",
        process.env.POSTGRES_USER || "",
        process.env.POSTGRES_PASSWORD || "",
        {
            host: 'postgres',
            dialect: 'postgres',
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