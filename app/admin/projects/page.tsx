'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Snackbar, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
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
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#FFFFFF', mb: 0.5, fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Manage Projects
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#525252', fontFamily: 'var(--font-inter), sans-serif' }}>
          Add or remove items from the agency&apos;s portfolio.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left — project grid */}
        <Grid item xs={12} md={8}>
          {isListLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#F97316' }} />
            </Box>
          ) : projects.length === 0 ? (
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: 'rgba(17,17,17,0.9)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
              }}
            >
              <Typography sx={{ color: '#A3A3A3', fontFamily: 'var(--font-inter), sans-serif' }}>
                No projects found. Add one on the right to get started!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} key={project.id}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(17,17,17,0.9)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                      '&:hover': { borderColor: 'rgba(249,115,22,0.2)' },
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ position: 'relative', width: '100%', height: 180 }}>
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ px: 2, pt: 1.75, pb: 0.5 }}>
                      <Typography
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-inter), sans-serif',
                          mb: 1,
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          background: 'rgba(249,115,22,0.12)',
                          color: '#F97316',
                          border: '1px solid rgba(249,115,22,0.25)',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 500,
                          px: 1.25,
                          py: 0.3,
                          fontFamily: 'var(--font-inter), sans-serif',
                        }}
                      >
                        {project.category}
                      </Box>
                    </Box>

                    {/* Delete */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1.5, pb: 1.25 }}>
                      <IconButton
                        id={`delete-project-${project.id}`}
                        aria-label="delete project"
                        size="small"
                        onClick={() => handleDeleteProject(project.id)}
                        sx={{
                          color: '#EF4444',
                          borderRadius: '8px',
                          '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Right — add form */}
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
          sx={{
            backgroundColor: toast.severity === 'success' ? '#22C55E' : '#EF4444',
            color: '#FFFFFF',
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
