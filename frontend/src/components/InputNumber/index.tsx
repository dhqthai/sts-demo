import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

interface Props extends NumberFormatProps {}

export const InputNumber: React.FC<Props> = (props) => {
  return <NumberFormat {...props} className='ant-input' />;
};
