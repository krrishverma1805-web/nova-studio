'use client';

import { useState } from 'react';
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
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const DRAWER_WIDTH = 220;

const menuItems = [
  { text: 'Dashboard', path: '/admin', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
  { text: 'Projects', path: '/admin/projects', icon: <WorkIcon sx={{ fontSize: 18 }} /> },
  { text: 'Contacts', path: '/admin/contacts', icon: <EmailIcon sx={{ fontSize: 18 }} /> },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    window.location.href = '/admin/login';
  };

  const handleNavClick = () => {
    if (isMobile) setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#0D0D0D',
        color: '#FFFFFF',
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          justifyContent: isMobile ? 'space-between' : 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
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
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            sx={{ color: '#A3A3A3', '&:hover': { color: '#FFFFFF' } }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Nav links */}
      <List sx={{ px: 1.5, py: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }} onClick={handleNavClick}>
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
    </Box>
  );

  return (
    <>
      {/* Mobile top app bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: '#0D0D0D',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important', px: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  background: '#F97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#000', lineHeight: 1 }}>N</Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                Nova Admin
              </Typography>
            </Box>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: '#FFFFFF' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop: permanent sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: '#0D0D0D',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile: temporary drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: '#0D0D0D',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default AdminSidebar;
