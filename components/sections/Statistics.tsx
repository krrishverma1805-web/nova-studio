import { Box, Container, Typography } from '@mui/material';
import prisma from '@/lib/prisma';
import StatisticsClient from './StatisticsClient';
import styles from './Statistics.module.css';

const Statistics = async () => {
  const stats = await prisma.stat.findMany();

  return (
    <Box component="section" id="statistics" className={styles.statsSection}>
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
            By the Numbers
          </span>
          <Typography variant="h2" sx={{ color: '#FFFFFF', fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Our Track Record
          </Typography>
        </Box>
        <StatisticsClient stats={stats.map((s) => ({ id: s.id, label: s.label, value: s.value }))} />
      </Container>
    </Box>
  );
};

export default Statistics;
