import { Book, BookStatus } from '../store/BookContext/BooksContextType';
import { API_URL } from '../utils/constants';

interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  body?: Book | { status: BookStatus };
}

async function fetchData({ method, endpoint, body }: FetchOptions) {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

export async function getBooks() {
  const data = await fetchData({ method: 'GET', endpoint: '/books' });
  return data.map((book: { isbn: string }) => ({
    ...book,
    isbn: +book.isbn,
  }));
}

export async function addBook(newBook: Book) {
  return await fetchData({
    method: 'POST',
    endpoint: '/books',
    body: newBook,
  });
}

export async function deleteBook(itemId: string) {
  await fetchData({ method: 'DELETE', endpoint: `/books/${itemId}` });
}

export async function updateBook(itemId: string, updatedBook: Book) {
  return await fetchData({
    method: 'PUT',
    endpoint: `/books/${itemId}`,
    body: updatedBook,
  });
}
export async function updateBookStatus(itemId: string, status: BookStatus) {
  return await fetchData({
    method: 'PATCH',
    endpoint: `/books/${itemId}`,
    body: { status },
  });
}
