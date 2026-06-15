'use client';

import { usePathname } from 'next/navigation';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        py: 6,
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 0.75 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#F97316',
                  boxShadow: '0 0 6px rgba(249,115,22,0.6)',
                }}
              />
              <Typography
                sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF', fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Nova Studio
              </Typography>
            </Box>
            <Typography sx={{ color: '#525252', fontSize: '0.875rem', fontFamily: 'var(--font-inter), sans-serif' }}>
              Crafting digital experiences that leave a lasting impression.
            </Typography>
          </Box>

          {/* Social icons */}
          <Stack direction="row" spacing={0.5}>
            <IconButton
              id="footer-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ color: '#A3A3A3', '&:hover': { color: '#F97316' }, transition: 'color 0.2s ease' }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              id="footer-twitter"
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              sx={{ color: '#A3A3A3', '&:hover': { color: '#F97316' }, transition: 'color 0.2s ease' }}
            >
              <XIcon />
            </IconButton>
            <IconButton
              id="footer-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: '#A3A3A3', '&:hover': { color: '#F97316' }, transition: 'color 0.2s ease' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Copyright */}
        <Typography
          sx={{
            textAlign: 'center',
            color: '#525252',
            fontSize: '0.8rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            pt: 3,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          © {new Date().getFullYear()} Nova Studio. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
