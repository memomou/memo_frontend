const getEnv = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

const config = {
  backendUri: getEnv('REACT_APP_BACKEND_URI', 'https://memoapi.entto.shop'),
};

export default config;
