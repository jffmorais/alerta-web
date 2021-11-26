import jwt_decode from "jwt-decode";
export const TOKEN_KEY = "@token";
export const USER = "@id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  const decoded = jwt_decode(token);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER, decoded.sub);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
};