import prisma from "@/utils/db"; // Assuming you're using Prisma for database interaction
import bcrypt from 'bcrypt'

export const getUserFromDb = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email }, // Search by email
  });

  if (user) {
    return user; // Return the user object if the credentials are correct
  }

  return null;
};
