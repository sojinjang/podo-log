export const createInvttCode = (): string => {
  return Math.random().toString(36).substring(2, 10);
};
