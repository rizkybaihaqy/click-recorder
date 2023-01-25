import { Deta } from "deta";
import config from "../config";

const deta = Deta(config.DETA_KEY);

const db = deta.Base("click-recorder");

export default db;
