import React from 'react';
import { BrowserRouter } from "react-router-dom";
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(rtl.cleanup);

describe( 'Basic App functionality', ()=> {
  it('renders correctly', ()=> {
    const wrapper = rtl.render(<BrowserRouter><App /></BrowserRouter>)
    expect(wrapper.baseElement).toMatchSnapshot()
  })
  it('Log in renders', ()=> {
    const wrapper = rtl.render(
  <BrowserRouter><App /></BrowserRouter>
    );
    // console.log(wrapper.debug())
    const element = wrapper.queryByText(/Log in to your account/i);
    expect(element).toBeInTheDocument();
    expect(element).toBeTruthy();
    expect(element).toBeVisible();
  });
  // it('Profile button routes to user profile', ()=>{
  //   const wrapper = rtl.render(<BrowserRouter><App /></BrowserRouter>);
  //   const profileButton = wrapper.getByTestId('profile-button')
  //   // On main page, this is not the profile page
  //   expect(profilePageEditButton).not.toBeInTheDocument();
  //   // After clicking on button, I can see the edit profile button, therefore am on profile page
  //   rtl.fireEvent.click(profileButton);
  //   const profilePageEditButton = wrapper.queryByText(/Edit Profile/i)
  //   expect(profilePageEditButton).toBeInTheDocument()
  // })
})