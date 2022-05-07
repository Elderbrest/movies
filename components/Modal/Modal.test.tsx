import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './index';

describe('Modal', () => {
  test('renders modal correctly', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <h1>Content goes here!</h1>
      </Modal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInDocument;
  });
});
