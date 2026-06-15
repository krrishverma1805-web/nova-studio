'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useInView from '@/hooks/useInView';
import type { Project } from '@/types';
import styles from './Portfolio.module.css';

const CATEGORIES = ['All', 'Web Design', 'Branding', 'Development'];

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const fetchProjects = async () => {
      const params = activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : '';
      const res = await fetch(`/api/projects${params}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    };
    fetchProjects();
  }, [activeCategory]);

  return (
    <Box component="section" id="portfolio" className={styles.portfolioSection}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#F97316',
              display: 'block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Our Work
          </span>
          <Typography variant="h2" sx={{ color: '#FFFFFF', fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Featured Projects
          </Typography>
        </Box>

        {/* Filter buttons */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: active ? '#F97316' : 'transparent',
                  border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  color: active ? '#000000' : '#FFFFFF',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(249,115,22,0.4)';
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Project cards */}
        <Grid container spacing={3} ref={ref}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.projectCard}>
                  {/* Category badge */}
                  <span className={styles.categoryBadge}>{project.category}</span>

                  <div className={styles.projectImageWrapper}>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.projectOverlay}>
                      <Typography
                        variant="h3"
                        sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', mb: 0 }}
                      >
                        {project.title}
                      </Typography>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
