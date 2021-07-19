import { LANGUAGES } from 'constants/language';
import { createBrowserHistory } from 'history';
import { parse, stringify } from 'query-string';
import { RouteProps } from 'react-router-dom';

export const parseParamToObject = (searchString: string) => parse(searchString);
export const parseObjectToParam = (object: Record<string, any>) => stringify(object);

export const history = createBrowserHistory();

/**
 * Base props for pages defined.
 */
export type BasePageProps = RouteProps;

export const getLanguageSupport = () => defaultLanguage;

export const getQueryString = (key) => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(key);
};

export const mapQueryParams = (params) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));

  return searchParams.toString();
};

export const redirectTo = (path) => history.push(path);

export const isNullOrEmpty = (str): boolean => {
  let returnValue = false;
  if (!str || str === 'null' || str === '' || str === '{}' || str === 'undefined' || str.length === 0) {
    returnValue = true;
  }
  return returnValue;
};

export const logData = (title, ...args) => {
  try {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(
        `%c ${isNullOrEmpty(title) ? 'LOGGER DEVELOP' : title}`,
        'display:block;background:#fff;color:red;width:100%;text-align:center;font-weight:bold;font-size:12px;margin:12px auto 0 auto;padding:4px 12px;border-radius:2px',
      );
      // console.log('Arguments')
      console.group('Arguments');
      if (args) {
        args.forEach((item) => console.log(item));
        console.groupEnd();
      }
    }
  } catch (err) {
  } finally {
    console.groupEnd();
  }
};

const defaultLanguage = 'en';
const getCurrentLanguage = (): LanguageCulture => {
  const _lang = localStorage.getItem('lang') || defaultLanguage;
  const _def = LANGUAGES.filter((t) => t.code === _lang);
  if (_def.length > 0) return _def[0];
  return LANGUAGES[0];
};

export { LANGUAGES, getCurrentLanguage, defaultLanguage };
