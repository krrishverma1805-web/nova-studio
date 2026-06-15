'use client';

import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import AdminSidebar, { DRAWER_WIDTH } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return isLoginPage ? (
    <>{children}</>
  ) : (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundAttachment: 'fixed',
      }}
    >
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          overflow: 'auto',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
