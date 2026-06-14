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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Contact Submissions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review messages and requests sent by clients from the public contact form.
        </Typography>
      </Box>

      <ContactsTable contacts={contacts} />
    </Box>
  );
}
