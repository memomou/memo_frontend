const getEnv = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

const config = {
  backendUri: getEnv('REACT_APP_BACKEND_URI', 'http://localhost:3001'),
};

export default config;
