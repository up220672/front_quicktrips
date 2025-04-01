import * as React from 'react';
import ComboBox from '../atoms/Autocomplete';

// Datos dinámicos
const movies = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight'];
const fruits = ['Apple', 'Banana', 'Cherry'];

export const BoxAutoComplete = () => {
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

  const handleMovieSelect = (index) => {
    console.log('Selected movie index:', index);
  };

  const handleFruitSelect = (index) => {
    console.log('Selected fruit index:', index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Box AutoComplete</h1>

      <div style={styles.stack}>
        {/* Autocompletado para películas */}
        <ComboBox label="Select a movie" options={movies} onSelect={handleMovieSelect} />

        {/* Autocompletado para frutas */}
        <ComboBox label="Choose a fruit" options={fruits} onSelect={handleFruitSelect} />
      </div>
    </div>
  );
};