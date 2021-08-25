import options from "../data/knexfile.cjs";
import knex from "knex";

const env = process.env.NODE_ENV || "development";
const dbConfigOptions = options[env];
const dbConnect = knex(dbConfigOptions);

export { dbConnect };
