import prisma from '@/prisma';
import { addMonths, isAfter } from 'date-fns';

// Service untuk membuat referral baru
export const createReferralService = async (referralData: any) => {
  try {
    return await prisma.referral.create({
      data: {
        ...referralData,
        expiresAt: addMonths(new Date(), 3), // Atur masa berlaku 3 bulan
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

// Service untuk mendapatkan referral berdasarkan kode
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

// Service untuk memperbarui poin referral dan memperbarui masa berlaku poin
export const updateReferralPointsService = async (code: string, points: number) => {
  try {
    // Dapatkan referral yang relevan
    const referral = await prisma.referral.findUnique({
      where: { code },
    });

    if (!referral) {
      throw new Error(`Referral with code ${code} not found.`);
    }

    // Periksa apakah poin sudah kedaluwarsa
    if (referral.expiresAt && isAfter(new Date(), referral.expiresAt)) {
      // Jika poin sudah kedaluwarsa, set poin menjadi 0
      await prisma.referral.update({
        where: { code },
        data: {
          points: 0, // Reset poin
          expiresAt: addMonths(new Date(), 3), // Reset masa berlaku 3 bulan lagi
        },
      });
    }

    // Tambahkan poin baru dan perbarui masa berlaku 3 bulan ke depan
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