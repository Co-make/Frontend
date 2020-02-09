import React from 'react';
import { BrowserRouter } from "react-router-dom";
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

afterEach(rtl.cleanup);

describe( 'Basic App functionality', ()=> {
  it('renders correctly according to snapshot', ()=> {
    const wrapper = rtl.render(<BrowserRouter><App /></BrowserRouter>)
    expect(wrapper.baseElement).toMatchSnapshot()
  })
  it('Login page renders', ()=> {
    const wrapper = rtl.render(
  <BrowserRouter><App /></BrowserRouter>
    );
    // console.log(wrapper.debug())
    const element = wrapper.queryByText(/Log in to your account/i);
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
    // expect(element).toBeTruthy();
  });
  it('Register page renders', ()=>{
    const wrapper = rtl.render(<BrowserRouter><App/></BrowserRouter>);
    // console.log(wrapper.debug())
    const registerButton = rtl.getByTestId(wrapper.container,"register-button")
    rtl.fireEvent.click(registerButton)
    const element = wrapper.getByText('Create a new account');
    expect(element).toBeVisible();

  })
  // it('Profile button routes to user profile', ()=>{
  //   const wrapper = rtl.render(<BrowserRouter><App /></BrowserRouter>);
  //   const profileButton = wrapper.getByTestId('profile-button')
  //   // On main page, this is not the profile page
  //   // expect(profilePageEditButton).not.toBeInTheDocument();
  //   // Need to Log in
  //   // Navigate to main page
  //   // Navigate to Profile Page
  //   // After clicking on button, I can see the edit profile button, therefore am on profile page
  //   rtl.fireEvent.click(profileButton);
  //   const profilePageEditButton = wrapper.queryByText(/New to us/i)
  //   expect(profilePageEditButton).toBeInTheDocument()
  // })
})