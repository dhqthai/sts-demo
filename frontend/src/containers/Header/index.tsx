import { DownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Popover, Row, Select, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Header as AntHeader } from 'antd/lib/layout/layout';
import { PATH } from 'constants/paths';
import { logoutUser } from 'containers/Auth/duck/thunks';
import storage from 'helpers/localStorage';
import { useAppDispatch, useAppSelector } from 'hooks/reduxcustomhook';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

const { Text } = Typography;
const { Option } = Select;

interface Props {
  onToggle: () => void;
  collapsed: boolean;
}

export default function Header(props: Props) {
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const { onToggle, collapsed } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const onLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const onGotoProfile = useCallback(() => history.push(PATH.PROFILE), [history]);

  const onChangeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      storage.setValueIntoKey('lang', lang);
    },
    [i18n],
  );

  return (
    <>
      <AntHeader className={classes.header}>
        <Row wrap={false} align='middle' justify='space-between'>
          <Col span={12}>
            <Row wrap={false} align='middle' justify='start'>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: onToggle,
              })}
              <Text className={classes.titleHeader} ellipsis>
                {t('MENU_DASHBOARD')}
              </Text>
            </Row>
          </Col>

          <Col span={8}>
            <Row wrap={false} align='middle' justify='end' gutter={10}>
              <Col flex='none'>
                <Select defaultValue={i18n.language} style={{ width: 120 }} onChange={onChangeLanguage}>
                  <Option value='en'>English</Option>
                  <Option value='vn'>Vietnamese</Option>
                </Select>
              </Col>
              <Col flex='none'>
                <Avatar size={30} icon={<UserOutlined />} />
              </Col>
              <Col flex='none'>
                <Text className={classes.userName} ellipsis>
                  {user.role}
                </Text>
              </Col>
              <Col flex='none'>
                <Popover
                  overlayClassName={classes.profileMenu}
                  placement='bottomRight'
                  content={
                    <div>
                      <div className={classes.itemMenu} onClick={onGotoProfile}>
                        <UserOutlined />
                        <div className={classes.textMenu}>{t('COMMON_PROFILE')}</div>
                      </div>
                      <div className={classes.itemMenu} onClick={onLogout}>
                        <LogoutOutlined />
                        <div className={classes.textMenu}>{t('COMMON_LOGOUT')}</div>
                      </div>
                    </div>
                  }
                  trigger='click'>
                  <DownOutlined />
                </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
      </AntHeader>
      <Text className={classes.title} ellipsis>
        {t('MENU_DASHBOARD')}
      </Text>
    </>
  );
}
