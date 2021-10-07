import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const envs = {
  API_KEY: process.env.BRIO_API_KEY ?? "",
};
