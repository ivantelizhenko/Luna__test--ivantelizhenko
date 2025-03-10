import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import InputField from './InputField';
import SelectField from './SelectField';
import { BookFormRow } from './BookFornRow';
import Button from '../Button';
import toast from 'react-hot-toast';
import { Book } from '../../store/BookContextType';

const StyledBookForm = styled.form`
  & div:not(:last-of-type) {
    margin-bottom: 2.4rem;
  }

  max-width: 80rem;
  height: fit-content;
  background-color: #fefae0;
  padding: 2.4rem 4.8rem;
  border-radius: 4px;
  margin: auto;
  position: absolute;
  inset: 0;

  & button {
    margin-top: 2.4rem;
    width: 100%;
  }
`;

function BookForm() {
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    category: 'Fiction',
    isbn: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Обробник відправки форми
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);

    setFormData({ title: '', author: '', category: 'Fiction', isbn: '' });
    toast.success('Book was added!');
  }

  return (
    <StyledBookForm onSubmit={handleSubmit}>
      <BookFormRow>
        <InputField
          name="title"
          title="Title"
          value={formData.title}
          onChange={handleChange}
        />
      </BookFormRow>
      <BookFormRow>
        <InputField
          name="author"
          title="Author"
          value={formData.author}
          onChange={handleChange}
        />
      </BookFormRow>
      <BookFormRow>
        <SelectField
          name="category"
          title="Category"
          options={['Fiction', 'Non-Fiction', 'Science']}
          onChange={handleChange}
          value={formData.category}
        />
      </BookFormRow>
      <BookFormRow>
        <InputField
          name="isbn"
          title="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          type="number"
        />
      </BookFormRow>

      <BookFormRow>
        <Button>&larr; Dashboard</Button>
        <Button type="submit">Додати книгу</Button>
      </BookFormRow>
    </StyledBookForm>
  );
}

export default BookForm;
