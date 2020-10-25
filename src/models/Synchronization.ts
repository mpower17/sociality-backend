import database from "../config/database";

database.sync({force: true}).then(() => console.log("tables created"));
