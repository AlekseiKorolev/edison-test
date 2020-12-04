export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Неверный формат"
    : undefined;

export const required = value =>
  value || typeof value === "number" ? undefined : "Поле не должно быть пустым";

export const maxnumber = value => {
  return !isNaN(value) && parseInt(value) <= 60
    ? undefined
    : "Некорректное значение";
};
