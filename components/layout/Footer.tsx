'use client';

import { usePathname } from 'next/navigation';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,1) 100%)',
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
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Nova Studio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crafting digital experiences that leave a lasting impression.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              id="footer-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              id="footer-twitter"
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}
            >
              <XIcon />
            </IconButton>
            <IconButton
              id="footer-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
        >
          © {new Date().getFullYear()} Nova Studio. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
