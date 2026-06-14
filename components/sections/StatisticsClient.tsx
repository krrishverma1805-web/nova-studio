'use client';

import { Typography, Box } from '@mui/material';
import useInView from '@/hooks/useInView';
import useCountUp from '@/hooks/useCountUp';
import styles from './Statistics.module.css';

interface StatData {
  id: number;
  label: string;
  value: string;
}

const parseNumericValue = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};

const getSuffix = (value: string): string => {
  return value.replace(/[0-9]/g, '');
};

const StatCounter = ({ stat, inView }: { stat: StatData; inView: boolean }) => {
  const numericValue = parseNumericValue(stat.value);
  const suffix = getSuffix(stat.value);
  const count = useCountUp({ end: numericValue, duration: 2000 }, inView);

  return (
    <div className={styles.statItem}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 800,
          background: 'linear-gradient(135deg, #F8FAFC 0%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        {count}{suffix}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
        {stat.label}
      </Typography>
    </div>
  );
};

const StatisticsClient = ({ stats }: { stats: StatData[] }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <Box ref={ref} className={styles.statsGrid}>
      {stats.map((stat) => (
        <StatCounter key={stat.id} stat={stat} inView={inView} />
      ))}
    </Box>
  );
};

export default StatisticsClient;
