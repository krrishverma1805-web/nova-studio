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
          '& > *': { borderBottom: 'unset' },
          backgroundColor: open ? 'rgba(79, 70, 229, 0.04)' : 'transparent',
          transition: 'background-color 0.2s',
        }}
      >
        <TableCell sx={{ pl: 3 }}>
          <IconButton size="small" onClick={() => setOpen(!open)} sx={{ color: 'primary.light' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
          {contact.name}
        </TableCell>
        <TableCell sx={{ color: 'text.secondary' }}>
          {contact.email}
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {contact.message}
        </TableCell>
        <TableCell align="right" sx={{ pr: 3, color: 'text.secondary' }}>
          {formatDate(contact.createdAt)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, backgroundColor: 'rgba(30, 41, 59, 0.4)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.light', mb: 1, fontWeight: 600 }}>
                Full Message Details
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
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
      <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#1E293B', backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography variant="body1" color="text.secondary">
          No contact submissions found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ backgroundColor: '#1E293B', backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <TableContainer>
        <Table aria-label="contacts table">
          <TableHead sx={{ backgroundColor: 'rgba(15, 23, 42, 0.3)' }}>
            <TableRow>
              <TableCell width={50} />
              <TableCell sx={{ pl: 1, fontWeight: 700, color: 'text.primary' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Snippet</TableCell>
              <TableCell align="right" sx={{ pr: 3, fontWeight: 700, color: 'text.primary' }}>Date Received</TableCell>
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
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'text.secondary',
          '.MuiTablePagination-actions': { color: 'primary.light' },
        }}
      />
    </Paper>
  );
};

export default ContactsTable;
