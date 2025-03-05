import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const { bio, location } = req.body;

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id as string,
      },
      data: {
        bio: bio || null,
        location: location || null,
      },
    });

    res.status(200).json({ 
      message: 'Profil mis à jour avec succès',
      user: {
        id: updatedUser.id,
        bio: updatedUser.bio,
        location: updatedUser.location
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
}
