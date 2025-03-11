import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import _ from 'lodash';

import InputField from '../InputField';
import SelectField from '../SelectField';
import BookFormRow from './BookFornRow';
import Button from '../Button';
import { useBooks } from '../../store/BookContext/BooksContext';
import { Book, BookStatus } from '../../store/BookContext/BooksContextType';
import { usePage } from '../../store/PageContext/PageContext';
import { useForm } from '../../store/FormContext/FormContext';

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

type DataBookFields = {
  title: string;
  author: string;
  category: 'Fiction' | 'Non-Fiction' | 'Science';
  isbn: string;
};

function BookForm() {
  const { addBook, editBook, clearEditingBook, editingBook } = useBooks();
  const { setPageDashboardStatus } = usePage();
  const { formStatus } = useForm();
  const [formData, setFormData] = useState<DataBookFields>({
    title: '',
    author: '',
    category: 'Fiction',
    isbn: '',
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category,
        isbn: editingBook.isbn.toString(),
      });
    }
  }, [editingBook]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const time = format(new Date(), 'dd MMMM y, h:mmaaa');

    if (formStatus === 'add') {
      const newBook = {
        ...formData,
        isbn: +formData.isbn,
        createdAt: time,
        status: BookStatus.Active,
        id: Math.random().toString(),
      };
      addBook(newBook);
      toast.success('Book was added!');
    }

    if (formStatus === 'edit') {
      const newBookWithoutModify = {
        ...editingBook,
        ...formData,
        isbn: +formData.isbn,
      };

      const newBook = {
        ...newBookWithoutModify,
        modifiedAt: time,
      };

      if (!_.isEqual(editingBook, newBookWithoutModify)) {
        editBook(newBook as Book);
        toast.success('Book was edited!');
      } else {
        toast('If you want to edit you should something change!', {
          duration: 4000,
          icon: '⚠️',
        });
      }
      clearEditingBook();
    }

    setPageDashboardStatus();
    setFormData({
      title: '',
      author: '',
      category: 'Fiction',
      isbn: '',
    });
  }

  function handleToDashboard() {
    setPageDashboardStatus();

    if (formStatus === 'edit') {
      clearEditingBook();
      setFormData({
        title: '',
        author: '',
        category: 'Fiction',
        isbn: '',
      });
    }
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
        <Button onClick={handleToDashboard}>&larr; Dashboard</Button>
        <Button type="submit">
          {formStatus === 'add' ? 'Add' : 'Edit'} book
        </Button>
      </BookFormRow>
    </StyledBookForm>
  );
}

export default BookForm;
