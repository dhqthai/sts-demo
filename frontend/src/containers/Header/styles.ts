import { COLOR } from 'constants/colors';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  header: {
    background: '#d0d0d0',
    padding: '0 20px',
    lineHeight: '40px',
    height: 40,
  },
  titleHeader: {
    paddingLeft: 10,
  },
  userName: {
    '&.ant-typography': {
      display: 'block',
      maxWidth: 60,
    },
  },
  itemMenu: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  textMenu: {
    width: 100,
    paddingLeft: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  profileMenu: {
    '& .ant-popover-inner': {
      borderRadius: '4px',
    },
    '& .ant-popover-inner-content > div > div': {
      color: 'blue',
    },
    '& .ant-popover-inner-content div div:first-child': {
      color: 'red',
    },
  },
  title: {
    padding: '10px 20px',
    background: '#f7f7f7',
  },
  content: {
    padding: '20px',
    background: COLOR.white,
  },
});
