import { Box, Container, Typography } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';
import styles from './Services.module.css';

const iconMap: Record<string, React.ReactNode> = {
  DesignServices: <DesignServicesIcon sx={{ fontSize: 32 }} />,
  Code: <CodeIcon sx={{ fontSize: 32 }} />,
  Brush: <BrushIcon sx={{ fontSize: 32 }} />,
};

const Services = async () => {
  const services = await prisma.service.findMany();

  return (
    <Box component="section" id="services" className={styles.servicesSection}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <span className={styles.sectionLabel}>What We Do</span>
          <Typography
            variant="h2"
            sx={{ color: '#FFFFFF', fontSize: { xs: '2rem', md: '2.75rem' } }}
          >
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
