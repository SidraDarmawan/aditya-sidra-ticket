import prisma from '@/prisma';

interface CreateReferralBody {
  code: string;
  userId: number;
  points: number;
}

export const createReferralService = async (referralData: CreateReferralBody) => {
  try {
    return await prisma.referral.create({
      data: referralData,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create referral: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the referral.');
    }
  }
};