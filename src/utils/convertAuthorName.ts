export const convertAuthorName = (
  firstName: string,
  lastName: string,
  email: string
) => {
  const longAuthor = firstName && lastName ? `${firstName} ${lastName}` : email;

  const shortAuthor =
    firstName && lastName ? `${firstName} ${lastName.charAt(0)}.` : `${email}`;

  return {
    longAuthor,
    shortAuthor,
  };
};
