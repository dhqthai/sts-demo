/* eslint-disable react/prop-types */
import { PATH } from 'constants/paths';
import { BasePageProps } from 'helpers/common';
import { useAppSelector } from 'hooks/reduxcustomhook';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  component: React.FunctionComponent<BasePageProps>;
  role?: string | number;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, role, ...rest }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: PATH.LOGIN,
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!role) {
          return <Component {...props} />;
        }
        if (role && user.role === role) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: PATH.PERMISSION_DENY,
              }}
            />
          );
        }
      }}
    />
  );
};
