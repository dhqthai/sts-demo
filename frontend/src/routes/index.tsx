import { ProtectedRoute } from 'components/ProtectedRoute';
import { PATH } from 'constants/paths';
import responsive from 'constants/responsive';
import { ROLE_TYPE } from 'constants/role';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import MainLayout from 'layouts';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Login = React.lazy(() => import('containers/Auth'));
const DashBoard = React.lazy(() => import('containers/Dashboard'));
const Users = React.lazy(() => import('containers/Users'));
const Profile = React.lazy(() => import('containers/Profile'));
const NotFound = React.lazy(() => import('containers/NotFound'));
const Deny = React.lazy(() => import('containers/PermissionDeny'));

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: responsive.MAX_WIDTH_DESKTOP, margin: 'auto', height: '100vh' }}>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path={PATH.LOGIN} component={Login} />
            <Route exact path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={PATH.RESET_PASSWORD} component={ResetPassword} />
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <ProtectedRoute path={PATH.DASHBOARD} exact component={DashBoard} />
                  <ProtectedRoute role={ROLE_TYPE.ADMIN} path={PATH.PROFILE} exact component={Profile} />
                  <ProtectedRoute role={ROLE_TYPE.ADMIN} exact component={Users} path={PATH.USERS} />
                  <ProtectedRoute path={PATH.PERMISSION_DENY} exact component={Deny} />
                  <ProtectedRoute component={NotFound} />
                </Switch>
              </Suspense>
            </MainLayout>
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
