'use client';

import { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { trackEvent } from '@/lib/analytics';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Hero = () => {
  useEffect(() => {
    trackEvent('page_visit', 'homepage', '/');
  }, []);

  const handleCtaClick = () => {
    trackEvent('cta_click', 'start_a_project');
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box component="section" id="hero" className={styles.heroSection}>
      <div className={styles.heroBackground} />
      <div className={styles.heroGrid} />
      <Container maxWidth="xl">
        <div className={styles.heroContent}>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'secondary.main',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                mb: 2,
                fontSize: '0.9rem',
              }}
            >
              Nova Studio
            </Typography>
          </motion.div>

          <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontSize: { xs: '2.25rem', md: '3rem', xl: '3.5rem' },
                background: 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              We Build Digital Experiences That Matter
            </Typography>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 560,
                mx: 'auto',
                mb: 5,
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.8,
              }}
            >
              From stunning interfaces to scalable front-end architecture — we partner with
              ambitious brands to create products people love to use.
            </Typography>
          </motion.div>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                id="cta-start-project"
                variant="contained"
                size="large"
                onClick={handleCtaClick}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Box>
  );
};

export default Hero;
