export const add = (a: number, b: number) => a + b;

export const capitalize = (string = "") =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const validatePassword = (password: string) => {
  return !!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
};
