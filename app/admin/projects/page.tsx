'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from '@/components/admin/ProjectForm';
import type { Project } from '@/types';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; severity: 'success' | 'error'; message: string }>({
    open: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          showToast('error', 'Failed to load projects');
        }
      } catch {
        showToast('error', 'Failed to connect to the server');
      } finally {
        setIsListLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const showToast = (severity: 'success' | 'error', message: string) => {
    setToast({ open: true, severity, message });
  };

  const handleAddProject = async (formData: { title: string; category: string; imageUrl: string }) => {
    setIsSubmitLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('success', 'Project created successfully');
        // Prepend new project or refresh
        setProjects((prev) => [data, ...prev]);
      } else {
        showToast('error', data.error || 'Failed to create project');
      }
    } catch {
      showToast('error', 'Failed to submit project');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        showToast('success', 'Project deleted successfully');
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        showToast('error', data.error || 'Failed to delete project');
      }
    } catch {
      showToast('error', 'Failed to delete project due to server error');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Manage Projects
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add or remove items from the agency&apos;s portfolio.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Projects Grid */}
        <Grid item xs={12} md={8}>
          {isListLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : projects.length === 0 ? (
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: '#1E293B',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No projects found. Add one on the right to get started!
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#1E293B',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={project.imageUrl}
                      alt={project.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                        {project.title}
                      </Typography>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(6, 182, 212, 0.1)',
                          color: 'secondary.light',
                          fontWeight: 500,
                        }}
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2, pt: 0 }}>
                      <IconButton
                        id={`delete-project-${project.id}`}
                        aria-label="delete project"
                        onClick={() => handleDeleteProject(project.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Right Column - Project Form */}
        <Grid item xs={12} md={4}>
          <ProjectForm onSubmit={handleAddProject} isLoading={isSubmitLoading} />
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
