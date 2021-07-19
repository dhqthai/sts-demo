import Layout, { Content } from 'antd/lib/layout/layout';
import Header from 'containers/Header';
import SideBar from 'containers/SideBar';
import React, { ReactNode, useState } from 'react';
import { useStyles } from './styles';

interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => setCollapsed(!collapsed);

  return (
    <Layout className={classes.layout}>
      <SideBar collapsed={collapsed} />
      <Layout>
        <Header onToggle={onToggle} collapsed={collapsed} />
        <Content className={classes.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
