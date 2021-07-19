/* eslint-disable react/prop-types */
import { Col as ColAntd, ColProps as ColPropsAntd, Row as RowAntd, RowProps as RowPropsAntd } from 'antd';
import React from 'react';

export const Container: React.FC = (props) => {
  return <div>{props.children}</div>;
};

interface RowProps extends RowPropsAntd {}

export const Row: React.FC<RowProps> = (props) => {
  return <RowAntd {...props} />;
};

interface ColProps extends ColPropsAntd {
  textAlign?: 'left' | 'center' | 'right';
}

export const Col: React.FC<ColProps> = ({ textAlign, ...rest }) => {
  return <ColAntd {...rest} style={{ textAlign }} />;
};
