import prisma from '@/prisma';

export const deleteReferralService = async (code: string) => {
  try {
    await prisma.referral.delete({
      where: { code },
    });
    return { message: 'Referral successfully deleted' };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete referral by code ${code}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the referral.');
    }
  }
};