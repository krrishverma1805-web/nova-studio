'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F97316',
      dark: '#EA580C',
      light: '#FB923C',
    },
    secondary: {
      main: '#F97316',
      dark: '#EA580C',
      light: '#FB923C',
    },
    background: {
      default: '#0A0A0A',
      paper: '#111111',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A3A3A3',
    },
    success: {
      main: '#22C55E',
    },
    error: {
      main: '#EF4444',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
    h1: {
      fontSize: 'clamp(3rem, 7vw, 5.5rem)',
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
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
      color: '#A3A3A3',
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
          background: '#F97316',
          color: '#000000',
          boxShadow: 'none',
          '&:hover': {
            background: '#EA580C',
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 17, 17, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(17, 17, 17, 0.8)',
            borderRadius: 10,
            color: '#FFFFFF',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F97316',
              boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#525252',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F97316',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: '#525252',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0A0A0A',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        },
      },
    },
  },
});

export default theme;
