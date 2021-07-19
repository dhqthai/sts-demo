import { EditFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';

const { Password } = Input;

const Profile: React.FunctionComponent<{}> = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Card bordered={true} style={{ width: '100%', height: '100%' }} hoverable>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Badge
                count={
                  <div>
                    <EditFilled />
                  </div>
                }
                offset={[-10, 54]}>
                <Avatar size={64} icon={<UserOutlined />} />
              </Badge>
            </Col>
            <Col span={24}>
              <Form
                name='profile'
                layout='vertical'
                initialValues={{
                  firstName: 'admin',
                  lastName: 'super',
                }}
                className={classes.form}
                onFinish={onFinish}>
                <Row>
                  <Col span={24}>
                    <Row justify='space-between'>
                      <Col span={11}>
                        <Form.Item
                          name='firstName'
                          label={t('PROFILE_FULLNAME')}
                          rules={[{ required: true, message: t('PROFILE_FIRSTNAME') }]}>
                          <Input placeholder={t('PROFILE_FIRSTNAME')} bordered={false} />
                        </Form.Item>
                      </Col>
                      <Col span={11} className={classes.notLabel}>
                        <Form.Item name='lastName' rules={[{ required: true, message: t('PROFILE_LASTNAME') }]}>
                          <Input placeholder={t('PROFILE_LASTNAME')} bordered={false} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={t('PROFILE_PASSWORD')}
                      name='password'
                      rules={[{ required: true, message: t('PROFILE_PASSWORD') }]}>
                      <Password placeholder={t('PROFILE_PASSWORD')} bordered={false} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={t('PROFILE_CONFIRM_PASSWORD')}
                      name='passwordConfirm'
                      rules={[
                        {
                          required: true,
                          message: t('PROFILE_CONFIRM_PASSWORD'),
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(t('PROFILE_VALIDATE_CONFIRM_PASS'));
                          },
                        }),
                      ]}>
                      <Password placeholder={t('PROFILE_CONFIRM_PASSWORD')} bordered={false} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row wrap={false} justify='end' gutter={10}>
                      <Col flex='none'>
                        <Button type='primary' ghost>
                          {t('PROFILE_CANCEL')}
                        </Button>
                      </Col>
                      <Col flex='none'>
                        <Button type='primary' htmlType='submit'>
                          {t('PROFILE_UPDATE')}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
