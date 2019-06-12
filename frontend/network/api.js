import fetch from 'isomorphic-unfetch';

export const getMessages = async (token, recipient, start = 0, limit = 100) => {
  const query = `recipient=${recipient}&start=${start}&limit=${limit}`;
  const res = await fetch(`${process.env.API_URL}/messages?${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${process.env.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
