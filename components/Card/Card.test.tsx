import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './index';
import { categories } from '../../mocks';

describe('Card', () => {
  const category = categories[0];
  const movie = category.items[0];
  const handleSelectMovies = jest.fn();

  test('renders data correctly', () => {
    render(
      <Card
        handleSelectMovies={handleSelectMovies}
        key={movie.id}
        categoryId={category.id}
        id={movie.id}
        photoUrL={movie.photoUrL}
        title={movie.title}
        isSelected={false}
      />
    );

    const cardComponent = screen.getByText(/Nomadland/i);
    expect(cardComponent).toBeInTheDocument;
  });

  test('renders selected card correctly', () => {
    render(
      <Card
        handleSelectMovies={handleSelectMovies}
        key={movie.id}
        categoryId={category.id}
        id={movie.id}
        photoUrL={movie.photoUrL}
        title={movie.title}
        isSelected={true}
      />
    );

    const cardComponent = screen.getByText(/Nomadland/i);

    expect(cardComponent).toBeInTheDocument;
    expect(screen.getByText('Unselect')).toBeInTheDocument;
  })
})

