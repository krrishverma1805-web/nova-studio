'use client';

import { ReactNode } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

interface ServiceData {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ServicesClientProps {
  services: ServiceData[];
  iconMap: Record<string, ReactNode>;
}

const ServicesClient = ({ services, iconMap }: ServicesClientProps) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <Grid container spacing={3} ref={ref}>
      {services.map((service, index) => (
        <Grid item xs={12} md={4} key={service.id}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%' }}
          >
            <Box
              sx={{
                height: '100%',
                p: 3.5,
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  borderColor: 'rgba(249, 115, 22, 0.4)',
                  boxShadow: '0 0 24px rgba(249, 115, 22, 0.08)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F97316',
                  mb: 2.5,
                  flexShrink: 0,
                }}
              >
                {iconMap[service.icon] || null}
              </Box>

              <Typography
                variant="h3"
                sx={{ mb: 1.25, fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF' }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#A3A3A3', lineHeight: 1.65, fontSize: '0.9rem' }}
              >
                {service.description}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesClient;
