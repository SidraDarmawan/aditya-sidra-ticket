import prisma from '@/prisma';

export const updateReferralPointsService = async (code: string, points: number) => {
  try {
    return await prisma.referral.update({
      where: { code },
      data: { points: { increment: points } },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update referral points for code ${code}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating referral points.');
    }
  }
};