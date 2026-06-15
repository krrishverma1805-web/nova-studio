'use client';

import { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, CircularProgress } from '@mui/material';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  category: z.string().min(2, 'Please select a category'),
  imageUrl: z.string().url('Please enter a valid image URL (e.g. https://...)'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading: boolean;
}

const CATEGORIES = ['Web Design', 'Branding', 'Development'];

const ProjectForm = ({ onSubmit, isLoading }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<{ [key in keyof ProjectFormData]?: string }>({});

  const handleChange = (field: keyof ProjectFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = projectSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key in keyof ProjectFormData]?: string } = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ProjectFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ title: '', category: '', imageUrl: '' });
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        p: 3,
        backgroundColor: '#1E293B',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
        Add New Project
      </Typography>

      <TextField
        id="project-title"
        label="Project Title"
        value={formData.title}
        onChange={handleChange('title')}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        required
        size="small"
      />

      <TextField
        id="project-category"
        select
        label="Category"
        value={formData.category}
        onChange={handleChange('category')}
        error={!!errors.category}
        helperText={errors.category}
        fullWidth
        required
        size="small"
      >
        {CATEGORIES.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="project-image-url"
        label="Image URL"
        value={formData.imageUrl}
        onChange={handleChange('imageUrl')}
        error={!!errors.imageUrl}
        helperText={errors.imageUrl || 'Must be a valid absolute HTTP/HTTPS URL'}
        fullWidth
        required
        size="small"
      />

      <Button
        id="project-submit"
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ py: 1.2, fontWeight: 600 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Project'}
      </Button>
    </Box>
  );
};

export default ProjectForm;
