export const registerUser = async (privateKey: String) => {
  console.log(process.env.BASE_URL);
  const response = await fetch(`http://127.0.0.1:8080/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://127.0.0.1:3000',
    },
    body: JSON.stringify({ id: privateKey }),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (privateKey: String) => {
  const response = await fetch(`http://127.0.0.1:8080/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://127.0.0.1:3000',
    },
    body: JSON.stringify({ id: privateKey }),
  });
  if (!response.ok) {
    throw new Error('Failed to login user');
  }
};
