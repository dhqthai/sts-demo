import { Form, Input } from 'antd';
import { ForgotPasswordAPI } from 'apis/forgotpassword';
import { ButtonComponent } from 'components';
import { UnlogginLayout } from 'components/UnlogginLayout';
import { PATH } from 'constants/paths';
import { useStyles } from 'containers/Auth/styles';
import { parseParamToObject } from 'helpers/common';
import { useAppSelector } from 'hooks/reduxcustomhook';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

interface FormValue {
  password: string;
  confirm: string;
}

const Index: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();
  const param = parseParamToObject(useLocation().search);
  const [form] = Form.useForm();

  useEffect(() => {
    if (form.getFieldError('password').length > 0 || form.getFieldError('confirm').length > 0) {
      form.validateFields();
    }
  }, [form, i18n.language]);

  if (!param || !param.xxx || !param.email) {
    history.push(PATH.FORGOT_PASSWORD);
  }

  if (isLoggedIn) {
    history.push(PATH.DASHBOARD);
  }

  const onFinish = useCallback(
    async (value: FormValue) => {
      const payload = {
        email: param.email,
        token: param.xxx,
        password: value.password,
      } as ForgotPasswordRequest;
      try {
        const res = await ForgotPasswordAPI.UPDATENEWPASSWORD(payload);
        if (res.status) {
          history.push(PATH.LOGIN);
        }
      } catch (error) {
        // TODO: handle later if needed
      }
    },
    [param, history],
  );

  return (
    <UnlogginLayout>
      <Form form={form} name='basic' layout='vertical' onFinish={onFinish}>
        <Form.Item className={classes.title}>
          <span>{t('COMMON_RENEWPASSWORD')}</span>
        </Form.Item>
        <Form.Item
          name='password'
          label={t('COMMON_RENEWPASSWORD_FIRSTLABEL')}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('COMMON_RENEWPASSWORD_ERRORREQUIRED'),
            },
          ]}>
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item
          name='confirm'
          label={t('COMMON_RENEWPASSWORD_SECONDLABEL')}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('COMMON_RENEWPASSWORD_ERRORREQUIRED'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('COMMON_RENEWPASSWORD_ERRORMATCH')));
              },
            }),
          ]}>
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>
        <Form.Item>
          <ButtonComponent
            type='primary'
            htmlType='submit'
            name={t('COMMON_RENEWPASSWORD_BUTTON')}
            styles={classes.buttonSubmit}
          />
        </Form.Item>
      </Form>
    </UnlogginLayout>
  );
};

export default Index;
