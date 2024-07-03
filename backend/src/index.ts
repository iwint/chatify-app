import dotenv from 'dotenv'
import ExpressConfig from './config/express-config';
dotenv.config();

const app = ExpressConfig();
const port = process.env.PORT;

app.get("/", (req, res, next) => {
  res.send("EXP");
});

app.listen(port, () => console.log("RUNNIG"));


