export const dynamic = 'force-dynamic';

import { Box, Typography } from '@mui/material';
import prisma from '@/lib/prisma';
import ContactsTable from '@/components/admin/ContactsTable';
import type { Contact } from '@/types';

export const revalidate = 0; // Disable server caching for contacts page

export default async function ContactsAdminPage() {
  let contacts: Contact[] = [];

  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch contacts on server:', error);
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#FFFFFF',
            mb: 0.5,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Contact Submissions
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#525252', fontFamily: 'var(--font-inter), sans-serif' }}>
          Review messages and requests sent by clients from the public contact form.
        </Typography>
      </Box>

      <ContactsTable contacts={contacts} />
    </Box>
  );
}
