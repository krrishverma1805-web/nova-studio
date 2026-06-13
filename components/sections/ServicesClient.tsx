'use client';

import { ReactNode } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
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
    <Grid container spacing={4} ref={ref}>
      {services.map((service, index) => (
        <Grid item xs={12} md={4} key={service.id}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              sx={{
                height: '100%',
                p: 1,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  '& .service-icon': {
                    color: 'secondary.main',
                  },
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  className="service-icon"
                  sx={{
                    color: 'primary.light',
                    mb: 2.5,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {iconMap[service.icon] || null}
                </Box>
                <Typography variant="h3" sx={{ mb: 1.5, fontSize: '1.3rem' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesClient;
