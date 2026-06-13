import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.service.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.project.deleteMany();

  // Seed services
  await prisma.service.createMany({
    data: [
      {
        title: 'Web Design',
        description:
          'We craft clean, user-focused interfaces that turn visitors into customers.',
        icon: 'DesignServices',
      },
      {
        title: 'Front-End Development',
        description:
          'From component libraries to full SPAs — built for performance and scale.',
        icon: 'Code',
      },
      {
        title: 'Branding',
        description:
          'Visual identity that makes your business memorable and consistent across every touchpoint.',
        icon: 'Brush',
      },
    ],
  });

  // Seed stats
  await prisma.stat.createMany({
    data: [
      { label: 'Projects Completed', value: '150+' },
      { label: 'Clients Worldwide', value: '50+' },
      { label: 'Years Experience', value: '5' },
    ],
  });

  // Seed projects with Unsplash images
  await prisma.project.createMany({
    data: [
      {
        title: 'Luminary — Brand Refresh',
        category: 'Branding',
        imageUrl:
          'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      },
      {
        title: 'Orbit Analytics Dashboard',
        category: 'Web Design',
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      },
      {
        title: 'Clearpath Financial Site',
        category: 'Web Design',
        imageUrl:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      },
      {
        title: 'Pulse E-commerce Storefront',
        category: 'Development',
        imageUrl:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      },
      {
        title: 'Harbour Co. Identity System',
        category: 'Branding',
        imageUrl:
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
      },
      {
        title: 'Vertex SaaS Platform',
        category: 'Development',
        imageUrl:
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
