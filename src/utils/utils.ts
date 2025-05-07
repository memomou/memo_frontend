export const getAuthorNickname = (pathname: string) => {
  const paths = pathname.split('/');
  return ['user', 'setting', 'post'].includes(paths[1])
    ? ''
    : paths[1];
}