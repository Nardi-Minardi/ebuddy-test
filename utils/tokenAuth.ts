import Cookies from 'js-cookie';


export const tokenAuth = (): string => {
  const cookiesName = process.env.APP_NAME + "-token";
  const token = Cookies.get(cookiesName);
  if (token) {
    return token;
  }
  return '';
}