import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';
import styles from './Services.module.css';

const iconMap: Record<string, React.ReactNode> = {
  DesignServices: <DesignServicesIcon sx={{ fontSize: 40 }} />,
  Code: <CodeIcon sx={{ fontSize: 40 }} />,
  Brush: <BrushIcon sx={{ fontSize: 40 }} />,
};

const Services = async () => {
  const services = await prisma.service.findMany();

  return (
    <Box component="section" id="services" className={styles.servicesSection}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            What We Do
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Our Services
          </Typography>
        </Box>

        <ServicesClient
          services={services.map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            icon: s.icon,
          }))}
          iconMap={iconMap}
        />
      </Container>
    </Box>
  );
};

export default Services;
