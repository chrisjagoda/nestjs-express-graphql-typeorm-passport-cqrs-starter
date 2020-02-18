/**
 * Include at top of project to initialize env vars, etc.
 */
import { config } from "dotenv";
import "reflect-metadata";

config(); // read .env files into process.env
