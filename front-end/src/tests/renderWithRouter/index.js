import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router location={ history.location } navigator={ history }>
        { (
          <>
            { component }
            <ToastContainer />
          </>
        ) }
      </Router>,
    ),
    history,
  });
}
