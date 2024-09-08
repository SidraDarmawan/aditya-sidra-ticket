import { hashPassword } from '@/libs/bycrpt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
   
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'Reset password success',
    };
  } catch (error) {
    
    if (error instanceof Error) {
      throw new Error(`Failed to reset password: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while resetting the password.');
    }
  }
};