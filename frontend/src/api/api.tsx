export const registerUser = async (privateKey: String) => {
  console.log(process.env.BASE_URL);
  const response = await fetch(`http://localhost:8080/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(privateKey),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (privateKey: String) => {
  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(privateKey),
  });
  if (!response.ok) {
    throw new Error('Failed to login user');
  }
};
