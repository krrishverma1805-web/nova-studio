'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="sticky" id="navbar">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0, minHeight: { xs: 64, md: 72 } }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <RocketLaunchIcon sx={{ color: 'secondary.main', fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #F8FAFC 0%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
              }}
            >
              Nova Studio
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                id="nav-menu-toggle"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: { width: 280, pt: 2 },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
                  <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton onClick={() => handleNavClick(link.href)}>
                        <ListItemText
                          primary={link.label}
                          primaryTypographyProps={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'text.primary',
                      backgroundColor: 'rgba(148, 163, 184, 0.08)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
