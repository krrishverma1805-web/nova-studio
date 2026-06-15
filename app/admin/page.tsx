import { Box, Grid, Card, CardContent, Typography, Alert } from '@mui/material';
import prisma from '@/lib/prisma';
import connectMongoDB from '@/lib/mongodb';
import AnalyticsEvent from '@/models/AnalyticsEvent';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export const revalidate = 0; // Disable server caching for admin page

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
      icon: <WorkIcon sx={{ fontSize: 36, color: 'primary.light' }} />,
      description: 'Active case studies on portfolio',
    },
    {
      title: 'Contact Submissions',
      value: totalContacts,
      icon: <EmailIcon sx={{ fontSize: 36, color: 'secondary.light' }} />,
      description: 'Messages received from leads',
    },
    {
      title: 'Total Tracked Events',
      value: mongoConnected ? totalEvents : 'N/A',
      icon: <BarChartIcon sx={{ fontSize: 36, color: 'success.main' }} />,
      description: 'Interactions stored in MongoDB',
    },
    {
      title: 'Homepage Visits',
      value: mongoConnected ? pageVisits : 'N/A',
      icon: <VisibilityIcon sx={{ fontSize: 36, color: 'info.main' }} />,
      description: 'Total user impressions logged',
    },
    {
      title: 'CTA Button Clicks',
      value: mongoConnected ? ctaClicks : 'N/A',
      icon: <TouchAppIcon sx={{ fontSize: 36, color: 'warning.main' }} />,
      description: 'Clicks on "Start a Project"',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of Nova Studio performance and activity logs.
        </Typography>
      </Box>

      {!mongoConnected && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          Could not connect to MongoDB. Analytics data is temporarily unavailable. Make sure MongoDB is running.
        </Alert>
      )}

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 1,
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
