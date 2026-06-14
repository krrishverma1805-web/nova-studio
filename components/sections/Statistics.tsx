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
            By the Numbers
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Our Track Record
          </Typography>
        </Box>
        <StatisticsClient stats={stats.map((s) => ({ id: s.id, label: s.label, value: s.value }))} />
      </Container>
    </Box>
  );
};

export default Statistics;
