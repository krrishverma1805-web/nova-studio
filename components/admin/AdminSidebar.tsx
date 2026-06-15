'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';

export const DRAWER_WIDTH = 220;

const menuItems = [
  { text: 'Dashboard', path: '/admin', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
  { text: 'Projects', path: '/admin/projects', icon: <WorkIcon sx={{ fontSize: 18 }} /> },
  { text: 'Contacts', path: '/admin/contacts', icon: <EmailIcon sx={{ fontSize: 18 }} /> },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#0D0D0D',
          color: '#FFFFFF',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Brand */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '6px',
            background: '#F97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#000', lineHeight: 1 }}>
            N
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              lineHeight: 1.2,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Nova Admin
          </Typography>
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: '#525252',
              fontFamily: 'var(--font-inter), sans-serif',
              lineHeight: 1.2,
            }}
          >
            Digital Agency Management
          </Typography>
        </Box>
      </Box>

      <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.06)', mx: 0 }} />

      {/* Nav links */}
      <List sx={{ px: 1.5, py: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    borderRadius: '8px',
                    px: 1.5,
                    py: 1.1,
                    borderLeft: active ? '2px solid #F97316' : '2px solid transparent',
                    backgroundColor: active ? 'rgba(249,115,22,0.12)' : 'transparent',
                    color: active ? '#F97316' : '#A3A3A3',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: active ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                      color: active ? '#F97316' : '#FFFFFF',
                      '& .MuiListItemIcon-root': { color: active ? '#F97316' : '#FFFFFF' },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? '#F97316' : '#A3A3A3',
                      minWidth: 32,
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: active ? 600 : 400,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom logout */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', p: 1.5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '8px',
            px: 1.5,
            py: 1.1,
            color: '#A3A3A3',
            gap: 1,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: '#FFFFFF',
              '& .logout-icon': { color: '#EF4444' },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: '100%' }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'rgba(249,115,22,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#F97316' }}>N</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-inter), sans-serif',
                flexGrow: 1,
                color: 'inherit',
              }}
            >
              Log Out
            </Typography>
            <LogoutIcon className="logout-icon" sx={{ fontSize: 16, color: '#EF4444', transition: 'color 0.15s ease' }} />
          </Box>
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
