import { PrismaClient } from "@prisma/client";

// Creamos una variable para almacenar la instancia de Prisma
let prisma;

if (process.env.NODE_ENV === "production") {
  // En producción, simplemente creamos una instancia nueva
  prisma = new PrismaClient();
} else {
  // En desarrollo, verificamos si ya existe una instancia en el objeto global
  // Esto evita que Next.js cree una conexión nueva cada vez que guardas un cambio
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
