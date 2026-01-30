import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// Esto carga tus variables del archivo .env
dotenv.config();

export default defineConfig({
  datasource: {
    // Usamos el nombre de la variable que tienes en tu .env
    url: process.env.DATABASE_URL,
  },
});
