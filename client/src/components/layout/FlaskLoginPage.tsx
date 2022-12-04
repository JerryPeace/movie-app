import { useEffect } from 'react';

const DEFAULT_PAGE = '/ra#/movieResource?order=DESC&page=1&perPage=50&sort=year';

/**
 * FlaskLoginPage is to deligate the login UI to the old flask login UI. It redirects location to
 * `/` with the redirect_path back to the default page of react-admin.
 * @returns FlaskLoginPage
 */
const FlaskLoginPage = () => {
  // We redirect the page when it is mount at the first time.
  useEffect(() => {
    window.location.href = `/?redirect_path=${encodeURIComponent(DEFAULT_PAGE)}`;
  }, []);
  return <div />;
};

export default FlaskLoginPage;
