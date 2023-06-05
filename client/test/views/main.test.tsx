import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import App from 'views/main';


describe('main app view', () => {
  it('renders without crashing', () => {
    const screen = render(<App />);
  });
});
