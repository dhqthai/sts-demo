import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { ButtonComponent, InputComponent } from 'components';
import { Link } from 'components/Link';
import { UnlogginLayout } from 'components/UnlogginLayout';
import { PATH } from 'constants/paths';
import { useAppDispatch, useAppSelector } from 'hooks/reduxcustomhook';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { loginUser } from './duck/thunks';
import { useStyles } from './styles';

export interface FormValue {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { loading, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  if (isLoggedIn) {
    history.push(PATH.DASHBOARD);
  }

  useEffect(() => {
    if (form.getFieldError('username').length > 0 || form.getFieldError('password').length > 0) {
      form.validateFields();
    }
  }, [form, i18n.language]);

  const handleSubmitLoginForm = useCallback(
    (formValue: FormValue) => {
      if (!loading) {
        const payload = {
          username: formValue.username,
          password: formValue.password,
        };
        // TODO: here is handle error response from server at the first time user logged in unsuccessfully
        dispatch(loginUser(payload)).then((res) => {
          // TODO: consider handle 401 globally if needed
          if ((res as ILoginErrorReponse).status === 401) {
            form.setFields([
              {
                name: 'password',
                errors: [t('COMMON_VALIDATE_PASSWORD')],
              },
              {
                name: 'username',
                errors: [t('COMMON_VALIDATE_USERNAME')],
              },
            ]);
          }
        });
      }
    },
    [dispatch, form, loading, t],
  );

  const onFinish = (values: FormValue) => {
    handleSubmitLoginForm(values);
  };

  return (
    <UnlogginLayout>
      <Form form={form} name='basic' layout='vertical' onFinish={onFinish}>
        <Form.Item className={classes.title}>
          <span>{t('COMMON_LOGIN')}</span>
        </Form.Item>
        <Form.Item
          label={t('COMMON_USERNAME')}
          name='username'
          rules={[{ required: true, message: t('COMMON_VALIDATE_USERNAME') }]}>
          <InputComponent
            type=''
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder={t('COMMON_USERNAME')}
            bordered
          />
        </Form.Item>
        <Form.Item
          label={t('COMMON_PASSWORD')}
          name='password'
          rules={[{ required: true, message: t('COMMON_VALIDATE_PASSWORD') }]}>
          <InputComponent
            type='password'
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder={t('COMMON_PASSWORD')}
            bordered
          />
        </Form.Item>
        <Form.Item>
          <ButtonComponent
            type='primary'
            htmlType='submit'
            name={t('COMMON_LOGIN')}
            styles={classes.buttonSubmit}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item className={classes.forgetPassword}>
          <Link to={PATH.FORGOT_PASSWORD}>{t('COMMON_FORGET_PASSWORD')}</Link>
        </Form.Item>
      </Form>
    </UnlogginLayout>
  );
};

export default Login;
