import s from "sequelize";
const { Sequelize } = s;

const { PGDATABASE, PGUSERNAME, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSERNAME, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection established");
  })
  .catch((e) => console.log(e));

export default sequelize;
