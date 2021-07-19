import { COLOR } from 'constants/colors';
import { createUseStyles } from 'react-jss';

const style = {
  layout: {
    height: '100%',
  },
  content: {
    padding: '20px',
    background: COLOR.white,
  },
};
export const useStyles = createUseStyles(style);
