'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F46E5',
      dark: '#3730A3',
      light: '#818CF8',
    },
    secondary: {
      main: '#06B6D4',
      dark: '#0891B2',
      light: '#22D3EE',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
    divider: 'rgba(148, 163, 184, 0.12)',
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)',
            boxShadow: '0 6px 20px 0 rgba(79, 70, 229, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E293B',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0F172A',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.4)',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E293B',
          borderRight: '1px solid rgba(148, 163, 184, 0.08)',
        },
      },
    },
  },
});

export default theme;
