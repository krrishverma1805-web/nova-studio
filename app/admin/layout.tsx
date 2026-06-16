import { Box } from '@mui/material';
import AdminSidebar, { DRAWER_WIDTH } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
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
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: '72px', md: 4 }, // leave room for mobile top bar
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
