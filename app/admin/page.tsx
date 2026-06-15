import { Box, Grid, Typography, Alert } from '@mui/material';
import prisma from '@/lib/prisma';
import connectMongoDB from '@/lib/mongodb';
import AnalyticsEvent from '@/models/AnalyticsEvent';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export const revalidate = 0;

const cardSx = {
  p: 3,
  height: '100%',
  backgroundColor: 'rgba(17,17,17,0.9)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '14px',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  '&:hover': {
    borderColor: 'rgba(249,115,22,0.25)',
    backgroundColor: '#161616',
  },
};

const iconWrapSx = {
  width: 44,
  height: 44,
  borderRadius: '10px',
  background: 'rgba(249,115,22,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  color: '#F97316',
};

export default async function AdminDashboard() {
  let totalProjects = 0;
  let totalContacts = 0;
  let mongoConnected = true;
  let totalEvents = 0;
  let pageVisits = 0;
  let ctaClicks = 0;

  try {
    totalProjects = await prisma.project.count();
    totalContacts = await prisma.contact.count();
  } catch (error) {
    console.error('Failed to query PostgreSQL stats:', error);
  }

  try {
    await connectMongoDB();
    totalEvents = await AnalyticsEvent.countDocuments();
    pageVisits = await AnalyticsEvent.countDocuments({ eventType: 'page_visit' });
    ctaClicks = await AnalyticsEvent.countDocuments({ eventType: 'cta_click' });
  } catch (error) {
    console.error('Failed to query MongoDB analytics:', error);
    mongoConnected = false;
  }

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: <WorkIcon sx={{ fontSize: 22, color: '#F97316' }} />,
      description: 'Active case studies on portfolio',
    },
    {
      title: 'Contact Submissions',
      value: totalContacts,
      icon: <EmailIcon sx={{ fontSize: 22, color: '#F97316' }} />,
      description: 'Messages received from leads',
    },
    {
      title: 'Total Tracked Events',
      value: mongoConnected ? totalEvents : 'N/A',
      icon: <BarChartIcon sx={{ fontSize: 22, color: '#F97316' }} />,
      description: 'Interactions stored in MongoDB',
    },
    {
      title: 'Homepage Visits',
      value: mongoConnected ? pageVisits : 'N/A',
      icon: <VisibilityIcon sx={{ fontSize: 22, color: '#F97316' }} />,
      description: 'Total user impressions logged',
    },
    {
      title: 'CTA Button Clicks',
      value: mongoConnected ? ctaClicks : 'N/A',
      icon: <TouchAppIcon sx={{ fontSize: 22, color: '#F97316' }} />,
      description: 'Clicks on "Start a Project"',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#FFFFFF',
            mb: 0.5,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#525252', fontFamily: 'var(--font-inter), sans-serif' }}>
          Overview of Nova Studio performance and activity logs.
        </Typography>
      </Box>

      {!mongoConnected && (
        <Alert
          severity="warning"
          sx={{
            mb: 4,
            backgroundColor: 'rgba(249,115,22,0.08)',
            color: '#F97316',
            border: '1px solid rgba(249,115,22,0.2)',
            '& .MuiAlert-icon': { color: '#F97316' },
          }}
        >
          Could not connect to MongoDB. Analytics data is temporarily unavailable. Make sure MongoDB is running.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box sx={cardSx}>
              <Box sx={iconWrapSx}>{stat.icon}</Box>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  mb: 0.5,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  mb: 0.75,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  color: '#525252',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {stat.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
