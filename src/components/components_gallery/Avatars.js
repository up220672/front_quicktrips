import * as React from 'react';
import Stack from '@mui/material/Stack';
import SingleAvatar from '../atoms/Avatar';

export const AvatarGallery = () => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Avatars</h1>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <SingleAvatar name="Hector Diaz" />
      <SingleAvatar name="Daniel Pedroza" />
      <SingleAvatar name="Yeshua Hernandez" />
    </Stack>

    <Stack spacing={2} direction="row" style={styles.stack}>
      <SingleAvatar name="Hector Diaz" profilePicture="https://via.placeholder.com/150" />
      <SingleAvatar name="Daniel Pedroza" profilePicture="https://via.placeholder.com/150" />
      <SingleAvatar name="Yeshua Hernandez" profilePicture="https://via.placeholder.com/150" />
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