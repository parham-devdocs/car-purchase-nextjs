
import { Sequelize } from "sequelize";

const sequalize=new Sequelize({
  dialect:"postgres",
  host:"localhost",
  port:5432,
  username:"mypostgres",
  password:"mysecretpassword",
  database:"devdb",
  logging:false,
  define:{timestamps:true},
  
})

export default sequalize


