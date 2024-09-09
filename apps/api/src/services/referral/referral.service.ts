import prisma from '@/prisma';
import { addMonths, isAfter } from 'date-fns';

export const createReferralService = async (referralData: any) => {
  try {
    return await prisma.referral.create({
      data: {
        ...referralData,
        expiresAt: addMonths(new Date(), 3),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create referral: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the referral.');
    }
  }
};

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

export const updateReferralPointsService = async (code: string, points: number) => {
  try {
  
    const referral = await prisma.referral.findUnique({
      where: { code },
    });

    if (!referral) {
      throw new Error(`Referral with code ${code} not found.`);
    }

    if (referral.expiresAt && isAfter(new Date(), referral.expiresAt)) {
  
      await prisma.referral.update({
        where: { code },
        data: {
          points: 0, 
          expiresAt: addMonths(new Date(), 3), 
        },
      });
    }

    return await prisma.referral.update({
      where: { code },
      data: {
        points: { increment: points },
        expiresAt: addMonths(new Date(), 3),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update referral points for code ${code}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating referral points.');
    }
  }
};