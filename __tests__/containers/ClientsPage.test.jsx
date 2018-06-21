import React from 'react';
import { shallow } from 'enzyme';
import ClientsPage from '../../src/containers/ClientsPage';

describe('Rendering ClientsPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ClientsPage />);
  });

  it('should render page', () => {
    expect(wrapper.find('th').length).toBe(3);
  });
});
