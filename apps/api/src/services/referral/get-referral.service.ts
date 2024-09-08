import prisma from '@/prisma';

export const getReferralByCodeService = async (code: string) => {
  try {
    return await prisma.referral.findUnique({
      where: { code },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get referral by code ${code}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving the referral.');
    }
  }
};