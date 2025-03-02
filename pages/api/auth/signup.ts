import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, password, dateOfBirth, location } = req.body;

    // Basic validation
    if (!username || !email || !password || !dateOfBirth || !location) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris' });
    }

    // Validate age (must be 18+)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return res.status(400).json({ message: 'Vous devez avoir au moins 18 ans pour vous inscrire' });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        dateOfBirth: birthDate,
        location,
      },
    });

    // Return success without exposing password
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      } 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
}
