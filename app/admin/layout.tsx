'use client';

import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import AdminSidebar, { DRAWER_WIDTH } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return isLoginPage ? (
    children
  ) : (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F172A' }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
