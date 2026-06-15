'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Contact } from '@/types';

interface ContactsTableProps {
  contacts: Contact[];
}

const Row = ({ contact }: { contact: Contact }) => {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: open ? 'rgba(249, 115, 22, 0.03)' : 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: open ? 'rgba(249, 115, 22, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          },
        }}
      >
        <TableCell sx={{ pl: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              color: '#F97316',
              transition: 'transform 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(249, 115, 22, 0.08)',
              },
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.875rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {contact.name}
        </TableCell>
        <TableCell sx={{ color: '#A3A3A3', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.875rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {contact.email}
        </TableCell>
        <TableCell
          sx={{
            color: '#A3A3A3',
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.875rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {contact.message}
        </TableCell>
        <TableCell align="right" sx={{ pr: 3, color: '#A3A3A3', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.875rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {formatDate(contact.createdAt)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: open ? '1px solid rgba(255, 255, 255, 0.06)' : 'none' }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                p: 2.5,
                backgroundColor: 'rgba(13, 13, 13, 0.6)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Typography
                sx={{
                  color: '#F97316',
                  mb: 1,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                Full Message Details
              </Typography>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {contact.message}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = contacts.slice(page * limit, page * limit + limit);

  if (contacts.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: 'rgba(17, 17, 17, 0.9)',
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '14px',
        }}
      >
        <Typography sx={{ color: '#A3A3A3', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.875rem' }}>
          No contact submissions found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'rgba(17, 17, 17, 0.9)',
        backgroundImage: 'none',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table aria-label="contacts table">
          <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
            <TableRow>
              <TableCell width={50} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }} />
              <TableCell
                sx={{
                  pl: 1,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                Snippet
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  pr: 3,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                Date Received
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((contact) => (
              <Row key={contact.id} contact={contact} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={limit}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsChange}
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          color: '#A3A3A3',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.8rem',
          '.MuiTablePagination-actions': {
            color: '#F97316',
          },
          '.MuiTablePagination-selectIcon': {
            color: '#F97316',
          },
          '.MuiTablePagination-select': {
            color: '#FFFFFF',
          },
          '.MuiTablePagination-displayedRows': {
            color: '#A3A3A3',
          },
        }}
      />
    </Paper>
  );
};

export default ContactsTable;
