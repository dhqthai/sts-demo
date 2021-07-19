import { COLOR } from 'constants/colors';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  logo: {
    maxHeight: 100,
    display: 'block',
    padding: '0',
    objectFit: 'cover',
    margin: 'auto',
    maxWidth: '100%',
  },
  user: {
    padding: '10px',
  },
  infoUser: {
    '&.ant-typography': {
      display: 'block',
      paddingLeft: '10px',
      color: COLOR.white,
    },
  },
  avatar: {
    padding: 5,
  },
  copyRight: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
});
