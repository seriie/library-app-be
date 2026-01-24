import { customAlphabet } from "nanoid";

export const nanoIdFormat = (init) => {
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    20,
  );

  return `${init}${nanoid()}`;
};
