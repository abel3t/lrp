export const convertObjectToQueryString = (params: any) => {
  if (!params) {
    return '';
  }

  let qs = '';
  Object.entries(params).map(([key, value]: [string, any]) => {
    if (value && typeof value !== 'object') {
      qs += `&${key}=${value}`;
    }
  });

  if (!qs) {
    return '';
  }

  return '?' + qs.slice(1);
};
