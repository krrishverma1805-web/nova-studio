'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Chip, Card } from '@mui/material';
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
          <Typography
            variant="body2"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            Our Work
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Featured Projects
          </Typography>
        </Box>

        <Box className={styles.filterBar}>
          {CATEGORIES.map((category) => (
            <motion.div key={category} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                id={`filter-${category.toLowerCase().replace(/\s/g, '-')}`}
                variant={activeCategory === category ? 'contained' : 'outlined'}
                onClick={() => setActiveCategory(category)}
                sx={{
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: activeCategory === category ? 'white' : 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'text.primary',
                  },
                }}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </Box>

        <Grid container spacing={3} ref={ref}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    className={styles.projectCard}
                    sx={{
                      '&:hover': {
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <div className={styles.projectImageWrapper}>
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className={styles.projectOverlay}>
                        <Typography variant="h3" sx={{ fontSize: '1.15rem', mb: 0.5 }}>
                          {project.title}
                        </Typography>
                        <Chip
                          label={project.category}
                          size="small"
                          sx={{
                            width: 'fit-content',
                            backgroundColor: 'rgba(79, 70, 229, 0.3)',
                            color: 'primary.light',
                            fontSize: '0.75rem',
                            height: 24,
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
