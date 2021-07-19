/* eslint-disable react/prop-types */
import { Modal as ModalAntd, ModalFuncProps } from 'antd';
import React from 'react';

interface Props extends ModalFuncProps {}

export const Modal: React.FC<Props> = ({ children, ...rest }) => {
  return <ModalAntd {...rest}>{children}</ModalAntd>;
};
