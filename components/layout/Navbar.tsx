'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
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
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

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

  if (!mounted) return null;
  if (pathname.startsWith('/admin')) return null;

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavCtaClick = () => {
    trackEvent('cta_click', 'start_a_project_navbar');
    handleNavClick('#contact');
  };

  return (
    <AppBar position="sticky" id="navbar" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0, minHeight: { xs: 64, md: 72 } }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#F97316',
                boxShadow: '0 0 8px rgba(249,115,22,0.7)',
                flexShrink: 0,
              }}
            />
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-inter), sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Nova Studio
            </Box>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                id="nav-menu-toggle"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                sx={{ color: '#FFFFFF' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: 280, pt: 2, backgroundColor: '#0A0A0A', borderLeft: '1px solid rgba(255,255,255,0.06)' } }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close menu"
                    sx={{ color: '#FFFFFF' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton onClick={() => handleNavClick(link.href)}>
                        <ListItemText
                          primary={link.label}
                          primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500, color: '#FFFFFF' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
                    <Box
                      onClick={handleNavCtaClick}
                      sx={{
                        width: '100%',
                        py: 1.25,
                        px: 3,
                        background: '#F97316',
                        borderRadius: '999px',
                        color: '#000000',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      Start a Project
                    </Box>
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Box
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  component="button"
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    color: '#A3A3A3',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    cursor: 'pointer',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '6px',
                    transition: 'color 0.2s ease',
                    '&:hover': { color: '#F97316' },
                  }}
                >
                  {link.label}
                </Box>
              ))}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Box
                  id="nav-cta"
                  component="button"
                  onClick={handleNavCtaClick}
                  sx={{
                    background: '#F97316',
                    border: 'none',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    cursor: 'pointer',
                    px: 2.5,
                    py: 1,
                    borderRadius: '999px',
                    ml: 1,
                    transition: 'background 0.2s ease',
                    '&:hover': { background: '#EA580C' },
                  }}
                >
                  Start a Project
                </Box>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
