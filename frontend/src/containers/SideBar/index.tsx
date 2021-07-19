import { BankOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Menu, Row, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { logoImage } from 'assets/images';
import { PATH } from 'constants/paths';
import { useAppSelector } from 'hooks/reduxcustomhook';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const { Text } = Typography;

const { SubMenu } = Menu;

const SideBar = (props) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const { collapsed } = props;
  const classes = useStyles();

  const menu = [
    {
      path: '/',
      name: t('MENU_DASHBOARD'),
      key: 'dashboard',
      sub: false,
      icon: <HomeOutlined />,
    },
    {
      path: PATH.USERS,
      name: t('MENU_USERS'),
      key: 'users',
      sub: false,
      icon: <UserOutlined />,
    },
    {
      path: '/',
      name: t('MENU_PROVIDER'),
      key: 'provider',
      sub: true,
      icon: <BankOutlined />,
      items: [
        {
          path: '/provider/list',
          name: t('MENU_PROVIDER_LIST'),
          key: 'provider/list',
          sub: false,
        },
        {
          path: '/provider/register',
          name: t('MENU_PROVIDER_REGISTER'),
          key: 'provider/register',
          sub: false,
        },
        {
          path: '/provider/register-companies',
          name: t('MENU_PROVIDER_REGISTERS'),
          key: 'provider/register-companies',
          sub: false,
        },
        {
          path: '/provider/services',
          name: t('MENU_PROVIDER_SERVICES'),
          key: 'provider/services',
          sub: false,
        },
      ],
    },
  ];

  const renderMenu = useCallback((menus, icon = true) => {
    return (
      <>
        {menus.map((el) =>
          !el.sub ? (
            <Menu.Item key={el.key} icon={icon && el.icon}>
              <Link to={el.path}>{el.name}</Link>
            </Menu.Item>
          ) : (
            <SubMenu key={el.key} icon={icon && el.icon} title={el.name}>
              {renderMenu(el.items, false)}
            </SubMenu>
          ),
        )}
      </>
    );
  }, []);

  return (
    <Sider width={300} trigger={null} collapsible collapsed={collapsed}>
      <Link to='/'>
        <img className={classes.logo} src={logoImage} alt='logo' />
      </Link>
      <div className={classes.user}>
        <Row wrap={false} align='middle'>
          <Col flex='none'>
            <div className={classes.avatar}>
              <Avatar size={50} icon={<UserOutlined />} />
            </div>
          </Col>
          <Col flex='auto'>
            <div>
              <Text className={classes.infoUser} ellipsis>
                {user.name}
              </Text>
            </div>
          </Col>
        </Row>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={collapsed}>
        {renderMenu(menu)}
      </Menu>
      <div className={classes.copyRight}>{t('COMMON_FOOTER')}</div>
    </Sider>
  );
};

export default SideBar;
