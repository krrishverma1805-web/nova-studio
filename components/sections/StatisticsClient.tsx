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
          fontSize: { xs: '2.75rem', md: '4rem' },
          fontWeight: 800,
          color: '#F97316',
          mb: 0.75,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {count}{suffix}
      </Typography>
      <Typography
        sx={{
          color: '#A3A3A3',
          fontSize: '0.95rem',
          fontWeight: 500,
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
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
