/* eslint-disable react/prop-types */
import { Select } from 'antd';
import { Col, Row } from 'components/Container';
import { useStyles } from 'containers/Auth/styles';
import storage from 'helpers/localStorage';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const UnlogginLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const onChangeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      storage.setValueIntoKey('lang', lang);
    },
    [i18n],
  );

  return (
    <Row>
      <Col xs={{ span: 0 }} md={{ span: 12 }} className={classes.backgroundLeft} />
      <Col xs={{ span: 24 }} md={{ span: 12 }} className={classes.backgroundRight}>
        <Row className={classes.itemRight}>
          <Col xs={{ span: 24 }}>
            <Select
              className={classes.select}
              defaultValue={i18n.language}
              style={{ width: 120 }}
              onChange={onChangeLanguage}>
              <Select.Option value='en'>English</Select.Option>
              <Select.Option value='vn'>Vietnamese</Select.Option>
            </Select>
          </Col>
          <Col xs={{ span: 24 }}>
            <Row>
              <Col md={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                {children}
              </Col>
              <Col xs={24}>
                <div className={classes.footer}>{t('COMMON_FOOTER')}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
