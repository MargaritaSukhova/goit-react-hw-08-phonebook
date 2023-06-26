import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
// import { Form, Label, Input } from '../ContactForm/ContactForm.styled';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    } else if (e.currentTarget.name === 'number') {
      const regex = /^[0-9\b]+$/;
      if (e.currentTarget.value === '' || regex.test(e.currentTarget.value)) {
        setNumber(e.currentTarget.value);
      }
    }
  };

  const handleContactSave = e => {
    e.preventDefault();

    if (checkContacts(name)) {
      return alert(`${name} is already in contacts list!`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    reset();
  };

  const checkContacts = name => {
    const normalizedName = name.toLocaleLowerCase();
    return contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizedName
    );
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h4" mt={6} align="center">
          Add contact
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={handleContactSave}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // inputProps={{ pattern: '[a-z]' }}
              value={name}
              onChange={handleInputChange}
              type="text"
              name="name"
              id="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              margin="normal"
              fullWidth
              label="Name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              // sx={{
              //   pattern:
              //     '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
              // }}
              value={number}
              onChange={handleInputChange}
              // inputProps={{
              //   inputMode: 'numeric',
              //   pattern: '[0-9]*',
              // }}
              type="tel"
              name="number"
              id="number"
              // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              margin="normal"
              fullWidth
              label="Number"
              autoComplete="Number"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add contact
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
  // <Form onSubmit={handleContactSave}>
  //   <Label htmlFor="name">Name</Label>
  //   <Input
  //     value={name}
  //     onChange={handleInputChange}
  //     type="text"
  //     name="name"
  //     id="name"
  //     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  //     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  //     required
  //   />
  //   <Label htmlFor="number">Number</Label>
  //   <Input
  //     value={number}
  //     onChange={handleInputChange}
  //     type="tel"
  //     name="number"
  //     id="number"
  //     pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  //     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  //     required
  //   />
  //   <Button variant="contained" type="submit">
  //     Add contact
  //   </Button>
  // </Form>
  // );
};

export default ContactForm;
