export const isTokenExpired = (exp?: number) => {
  if (!exp) {
    return true;
  }

  return Date.now() > (exp * 1000);
};

export const getTokenExpirationDate = (jwtToken?: string): number | null => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return jwt && jwt.exp && jwt.exp * 1000 || null;
};
