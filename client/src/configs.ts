export const getBaseApi = () => {
  if (process.env.NODE_ENV === 'development') return 'localhost:5000';
  if (process.env.NODE_ENV === 'production') return 'https://flask-server-wy42z7oxqq-uk.a.run.app/';
};

export const baseApi = getBaseApi();

export default { baseApi };
