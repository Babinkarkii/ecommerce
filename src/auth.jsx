// Simulate a mock authentication service
const users = [
  { username: "user", password: "user123", role: "user" },
  { username: "admin", password: "admin123", role: "admin" },
];

export const authenticate = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user;
};
