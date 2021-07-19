import { MailFilled } from '@ant-design/icons';
import { Form, Input, message, Typography } from 'antd';
import { ForgotPasswordAPI } from 'apis/forgotpassword';
import { ButtonComponent } from 'components';
import { Col, Row } from 'components/Container';
import { UnlogginLayout } from 'components/UnlogginLayout';
import { PATH } from 'constants/paths';
import { useStyles } from 'containers/Auth/styles';
import { useAppSelector } from 'hooks/reduxcustomhook';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Index: React.FC = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const history = useHistory();

  if (isLoggedIn) {
    history.push(PATH.DASHBOARD);
  }

  useEffect(() => {
    if (form.getFieldError('email').length > 0) {
      form.validateFields();
    }
  }, [form, i18n.language]);

  const onFinish = useCallback(
    async (email: string) => {
      try {
        const res = await ForgotPasswordAPI.SEARCHBYEMAIL(email);
        if (res.status) {
          message.success(t('COMMON_FORGOTPASSWORD_MESSAGE'));
        }
      } catch (error) {
        form.setFields([
          {
            name: 'email',
            errors: [t('COMMON_FORGOTPASSWORD_ERRORFROMSERVER')],
          },
        ]);
      }
    },
    [form, t],
  );

  return (
    <UnlogginLayout>
      <Form form={form} name='basic' layout='vertical' onFinish={onFinish}>
        <Form.Item className={classes.title}>
          <span>{t('COMMON_FORGOTPASSWORD')}</span>
        </Form.Item>
        <Typography.Text>{t('COMMON_FORGOTPASSWORD_TEXT')}</Typography.Text>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: t('COMMON_FORGOTPASSWORD_ERRORREQUIRED') },
            { type: 'email', message: t('COMMON_FORGOTPASSWORD_ERRORINVALID') },
          ]}>
          <Input placeholder='Email' prefix={<MailFilled className='site-form-item-icon' />} />
        </Form.Item>
        <Row>
          <Col span={12} textAlign='center'>
            <ButtonComponent
              type='dashed'
              name={t('COMMON_FORGOTPASSWORD_SECONDARYBUTTON')}
              onClick={() => {
                history.push(PATH.LOGIN);
              }}
            />
          </Col>
          <Col span={12} textAlign='center'>
            <ButtonComponent type='primary' htmlType='submit' name={t('COMMON_FORGOTPASSWORD_PRIMARYBUTTON')} />
          </Col>
        </Row>
      </Form>
    </UnlogginLayout>
  );
};

export default Index;
