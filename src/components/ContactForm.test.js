import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    //arrange
    render(<ContactForm />);
    //act
    const headerText = screen.getByText(/Contact Form/i);
    //assert
    expect(headerText).toBeInTheDocument();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    ReferenceError(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "aliezeali@gmail.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "message");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessage = screen.getAllByTestId("error");
    expect(errorMessage).toHaveLength(5);
});


test('renders THREE error messages if user enters no values into any fields.', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "");
    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "");
    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, "");
    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message,"");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errorMessages = screen.getAllByTestId("error");
    //assert
    expect(errorMessages).toHaveLength(3);
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessages = screen.getAllByTestId("error");

    //assert
    expect(errorMessages).toHaveLength(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "ksjsjf");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "message");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessages = screen.getAllByTestId("error");
    //assert
    expect(errorMessages[0]).toHaveTextContent("email must be a valid email address");;
});


test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "keanu@gmail.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "message");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessages = screen.getAllByTestId("error");
    //arrange
    expect (errorMessages).toHaveLength(1);
    expect (errorMessages[0]).toHaveTextContent("lastName is a required field");

    
});


test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "keanu@gmail.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const messageDisplay = screen.queryByTestId("messageDisplay");
    //assert
    expect(messageDisplay).toBeNull();
});


test('renders all fields text when all fields are submitted.', async () => {
    //arrange
    render(<ContactForm />);
    //act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Alieze");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "keanu@gmail.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "");

    const button = screen.getByRole("button");
    userEvent.click(button);
    //assert
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();


});