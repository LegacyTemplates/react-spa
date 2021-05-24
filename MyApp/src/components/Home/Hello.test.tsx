import * as React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HelloApi } from './HelloApi';

describe('<Hello />', () => {

  it ('Updates heading on input change', done => {

    const el = render(<HelloApi />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
    
    let input = el.container.querySelector('#txtName')!;
    userEvent.type(input, 'A');

    setTimeout(() => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Hello, A!');
      done();
    }, 100);
  });

});
