'use client';

import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import styles from './Hero.module.css';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: 'easeOut' as const },
});

const Hero = () => {
  useEffect(() => {
    trackEvent('page_visit', 'homepage', '/');
  }, []);

  const handleCtaClick = () => {
    trackEvent('cta_click', 'start_a_project');
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="section" id="hero" className={styles.heroSection}>
      <div className={styles.orangeGlow} />
      <Container maxWidth="xl">
        <div className={styles.heroContent}>
          {/* Badge */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', justifyContent: 'center' }}>
            <span className={styles.heroBadge}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
              Digital Agency · Since 2019
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div {...fadeUp(0.15)}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                margin: '0 0 1.5rem',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              We Build Digital
              <br />
              Experiences That
              <br />
              <span style={{ color: '#F97316' }}>Matter</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div {...fadeUp(0.3)}>
            <p
              style={{
                color: '#A3A3A3',
                fontSize: '1.1rem',
                lineHeight: 1.75,
                maxWidth: 520,
                margin: '0 auto 2.5rem',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              From stunning interfaces to scalable front-end architecture — we partner with
              ambitious brands to create products people love to use.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.45)} style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button
              id="cta-start-project"
              onClick={handleCtaClick}
              whileHover={{ scale: 1.03, backgroundColor: '#EA580C' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#F97316',
                color: '#000000',
                border: 'none',
                borderRadius: '999px',
                padding: '14px 36px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Start a Project →
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </Box>
  );
};

export default Hero;
