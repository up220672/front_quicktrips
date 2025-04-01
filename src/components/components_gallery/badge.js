import React from 'react';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  BasicBadge,
  DotBadge,
  CustomBadge,
  BadgeWithMax,
  BadgeWithAlignment,
} from '../atoms/Badge';

export const BadgeGallery = () => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Badges</h1>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <BasicBadge badgeContent={4} color="primary" onClick={() => alert('BasicBadge clicked')}>
        <MailIcon color="action" />
      </BasicBadge>
      <BasicBadge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </BasicBadge>
    </Stack>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <DotBadge color="secondary">
        <MailIcon color="action" />
      </DotBadge>
      <DotBadge color="success">
        <MailIcon color="action" />
      </DotBadge>
    </Stack>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <CustomBadge badgeContent={4} color="secondary" onClick={() => alert('CustomBadge clicked')}>
        <ShoppingCartIcon />
      </CustomBadge>
    </Stack>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <BadgeWithMax badgeContent={100} max={99} color="secondary">
        <MailIcon />
      </BadgeWithMax>
      <BadgeWithMax badgeContent={1000} max={999} color="primary">
        <MailIcon />
      </BadgeWithMax>
    </Stack>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <BadgeWithAlignment
        badgeContent={12}
        color="secondary"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MailIcon />
      </BadgeWithAlignment>
      <BadgeWithAlignment
        badgeContent={99}
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MailIcon />
      </BadgeWithAlignment>
    </Stack>
  </div>
);

const styles = {
  container: {
    gap: '1rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  stack: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
};