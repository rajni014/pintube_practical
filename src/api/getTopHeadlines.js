import strings from '../constants/strings';
import apiRoute from './apiRoutes';

export const getTopHeadLines = async (country, apiKey) => {
  try {
    const response = await fetch(
      `${apiRoute.baseUrl}${apiRoute.headLines}?country=${country}&apiKey=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    alert(strings.somethingWentWrong);
  }
};
