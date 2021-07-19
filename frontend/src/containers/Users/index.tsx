/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Form,
  Grid,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  TablePaginationConfig,
} from 'antd';
import { UserAPI } from 'apis/user';
import { Col, Row } from 'components/Container';
import { InputNumber } from 'components/InputNumber';
import { Modal } from 'components/Modal';
import { PATH } from 'constants/paths';
import { ROLE_TYPE } from 'constants/role';
import { parseObjectToParam, parseParamToObject } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks/reduxcustomhook';
import { useDidMount } from 'hooks/useDidMount';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getListUser } from './duck/thunks';

const { useBreakpoint } = Grid;
interface IModalState {
  type: 'Add' | 'Edit' | 'Info';
  data: IUser | IAddUserRequest;
  isOpen: boolean;
}

const Index: React.FC = () => {
  const clearFiltersRef = useRef(() => {});
  const isMd = useBreakpoint().md;
  const history = useHistory();
  const location = useLocation();
  const params: IListUserRequest = parseParamToObject(location.search);
  const dispatch = useAppDispatch();
  const {
    user: { data, totalRecords, loading },
    auth: {
      user: { id: currentId },
    },
  } = useAppSelector((state) => state);
  const [modalState, setModalState] = useState<IModalState | undefined>(undefined);
  const [paramSearch, setParamSearch] = useState(params);
  const [isDisableButton, setDisableButton] = useState({});
  const [formEdit] = Form.useForm();
  const [formAdd] = Form.useForm();

  useEffect(() => {
    if (!modalState) {
      formAdd.resetFields();
      formEdit.resetFields();
    }
  }, [formAdd, formEdit, modalState]);

  useEffect(() => {
    dispatch(getListUser(paramSearch));
    history.push({ pathname: PATH.USERS, search: parseObjectToParam(paramSearch) });
  }, [dispatch, history, paramSearch]);

  const onSearchColumn = useCallback((selectedKeys: string, confirm: () => void, dataIndex: string) => {
    confirm();
    if (selectedKeys.length === 0) {
      setParamSearch((prev) => ({ ...prev, role: undefined }));
    }
  }, []);

  const onResetSearchColumn = useCallback((clearFilters: () => void) => {
    clearFilters();
    setParamSearch((prev) => ({
      ...prev,
      role: undefined,
    }));
  }, []);

  const onClearFilter = useCallback(() => {
    clearFiltersRef.current();
    setParamSearch({});
    history.push(PATH.USERS);
  }, [history]);

  const onOpenModal = (payload: IModalState) => setModalState(payload);

  const onCloseModal = () => setModalState(undefined);

  const onDeleteUser = useCallback(
    async (idUser: number) => {
      if (Number(currentId) === Number(idUser)) {
        message.error('Can not delete yourself');
        return;
      }
      try {
        const res = await UserAPI.DELETE_USER_BY_ID(idUser);
        if (res.status) {
          dispatch(getListUser(paramSearch));
        }
      } catch (error) {
        message.error('Can not delete at this time');
      }
    },
    [currentId, dispatch, paramSearch],
  );

  const onSubmitModal = useCallback(() => {
    if (!modalState) return;
    if (modalState.type === 'Edit') {
      formEdit.submit();
    }
    if (modalState.type === 'Add') {
      formAdd.submit();
    }
  }, [formAdd, formEdit, modalState]);

  const onFinishForm = useCallback(
    async (values) => {
      if (!modalState) return;
      if (modalState.type === 'Add') {
        try {
          const res = await UserAPI.ADD_USER(values);
          if (res.id) {
            dispatch(getListUser(paramSearch));
          }
        } catch (error) {
          message.error('Can not add user at this time');
        }
      }
      if (modalState.type === 'Edit') {
        try {
          const res = await UserAPI.UPDATE_USER({ id: (modalState.data as IUser).id, ...values });
          if (res.id) {
            dispatch(getListUser(paramSearch));
          }
        } catch (error) {
          message.error('Can not update user at this time');
        }
      }
      setModalState(undefined);
    },
    [dispatch, modalState, paramSearch],
  );

  const onChangeTable = useCallback(
    (pagination: TablePaginationConfig, { role }: any) => {
      if (pagination.current) {
        setParamSearch((prev) => ({
          ...prev,
          page: pagination.current,
          role: role ? role[0] : paramSearch.role || undefined,
        }));
      }
    },
    [paramSearch.role],
  );

  const onSearchInput = useCallback(
    (value: string) => {
      const keyword = value.trim();
      if (keyword) {
        setParamSearch((prev) => ({
          ...prev,
          keyword,
        }));
      } else {
        onClearFilter();
      }
    },
    [onClearFilter],
  );

  const getColumnSearchProps = useCallback(
    (dataIndex: string) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        clearFiltersRef.current = clearFilters;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDidMount(() => {
          if (paramSearch.role) {
            setSelectedKeys([paramSearch.role]);
          }
        });
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => onSearchColumn(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type='primary'
                onClick={() => onSearchColumn(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size='small'
                style={{ width: 90 }}>
                Search
              </Button>
              <Button onClick={() => onResetSearchColumn(clearFilters)} size='small' style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered || paramSearch.role ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    }),
    [onResetSearchColumn, onSearchColumn, paramSearch],
  );

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      with: 50,
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      with: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      with: 200,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      with: 100,
      ...getColumnSearchProps('role'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      with: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      with: 100,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      with: 100,
      render: (_, record: IUser) => (
        <>
          <a onClick={() => onOpenModal({ isOpen: true, type: 'Info', data: record })} style={{ marginRight: 5 }}>
            Info
          </a>
          <Popconfirm
            onConfirm={() => onDeleteUser(record.id)}
            title='Are you sure to delete this user'
            okText='Yes'
            cancelText='No'>
            <a>Delete</a>
          </Popconfirm>{' '}
          <a onClick={() => onOpenModal({ isOpen: true, type: 'Edit', data: record })}>Edit</a>
        </>
      ),
    },
  ];

  const renderModal = useMemo(() => {
    if (!modalState) return null;
    if (modalState.type === 'Info') {
      return (
        <Modal
          visible={modalState.isOpen}
          okText='Close'
          cancelButtonProps={{
            style: {
              display: 'none',
            },
          }}
          onCancel={onCloseModal}
          onOk={onCloseModal}
          width={1000}>
          <Row>
            <Descriptions title='INFO'>
              {Object.entries(modalState.data).map(([label, content]) => (
                <Descriptions.Item key={label} label={label}>
                  {content}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Row>
        </Modal>
      );
    }
    if (modalState.type === 'Edit') {
      return (
        <Modal
          visible={modalState.isOpen}
          onCancel={onCloseModal}
          onOk={onSubmitModal}
          width={1000}
          okText='Update'
          okButtonProps={{
            disabled: isDisableButton['editButton'],
          }}>
          <h1>Edit</h1>
          <Form
            form={formEdit}
            onFinish={onFinishForm}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 10 }}
            onFieldsChange={(_, allFields) => {
              const index = allFields.findIndex((ele) => ele.errors!.length > 0);
              if (index !== -1) {
                if (isDisableButton['editButton']) return;
                setDisableButton((prev) => ({
                  ...prev,
                  editButton: true,
                }));
              } else {
                if (!isDisableButton['editButton']) return;
                setDisableButton((prev) => ({
                  ...prev,
                  editButton: false,
                }));
              }
            }}>
            <Form.Item
              name='fullName'
              label='Full Name'
              rules={[{ required: true, message: 'Full Name is required' }]}
              initialValue={modalState.data.fullName}>
              <Input />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Email is required' }]}
              initialValue={modalState.data.email}>
              <Input />
            </Form.Item>
            <Form.Item
              name='phone'
              label='Phone'
              initialValue={modalState.data.phone}
              rules={[{ required: true, message: 'Phone is required' }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name='avatar' label='Avatar' initialValue={modalState.data.avatar}>
              <Input />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: 'Status is required' }]}
              initialValue={modalState.data.status}>
              <InputNumber />
            </Form.Item>
            <Form.Item name='role' label='Role' initialValue={modalState.data.role}>
              <Select>
                <Select.Option value={ROLE_TYPE.ADMIN}>Admin</Select.Option>
                <Select.Option value={ROLE_TYPE.MANAGER}>Manager</Select.Option>
                <Select.Option value={ROLE_TYPE.EDITOR}>Editor</Select.Option>
                <Select.Option value={ROLE_TYPE.USER}>User</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
    if (modalState.type === 'Add') {
      return (
        <Modal
          centered
          visible={modalState.isOpen}
          width={1000}
          okText='Add new user'
          onOk={onSubmitModal}
          onCancel={onCloseModal}>
          <h1>New user</h1>
          <Form form={formAdd} onFinish={onFinishForm} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
            <Form.Item name='fullName' label='Full Name' rules={[{ required: true, message: 'Full Name is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='userName' label='User Name' rules={[{ required: true, message: 'User Name is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Email is invalid' },
              ]}
              initialValue={(modalState.data as IAddUserRequest).email}>
              <Input />
            </Form.Item>
            <Form.Item
              name='phone'
              label='Phone'
              rules={[{ required: true, message: 'Phone is required' }]}
              initialValue={modalState.data.phone}>
              <InputNumber />
            </Form.Item>
            <Form.Item name='avatar' label='Avatar'>
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Password is required' }]}
              initialValue={(modalState.data as IAddUserRequest).password}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: 'Status is required' }]}
              initialValue={modalState.data.status}>
              <InputNumber />
            </Form.Item>
            <Form.Item name='role' label='Role' initialValue={ROLE_TYPE.USER}>
              <Select>
                <Select.Option value={ROLE_TYPE.ADMIN}>Admin</Select.Option>
                <Select.Option value={ROLE_TYPE.MANAGER}>Manager</Select.Option>
                <Select.Option value={ROLE_TYPE.EDITOR}>Editor</Select.Option>
                <Select.Option value={ROLE_TYPE.USER}>User</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }, [formAdd, formEdit, isDisableButton, modalState, onFinishForm, onSubmitModal]);

  return (
    <section>
      <Row>
        <Col md={12}>
          <Input.Search
            value={paramSearch.keyword}
            onSearch={onSearchInput}
            placeholder='search by email or phone'
            style={{ width: 400 }}
          />
        </Col>
        <Col md={12} textAlign={isMd ? 'right' : 'left'}>
          <Button
            onClick={() =>
              onOpenModal({
                isOpen: true,
                type: 'Add',
                data: {
                  email: '',
                  fullName: '',
                  password: '',
                  phone: '',
                  userName: '',
                  avatar: '',
                  status: 0,
                  role: 'USER',
                },
              })
            }
            type='primary'>
            Add
          </Button>{' '}
          <Button type='primary' onClick={onClearFilter}>
            Clear Filter
          </Button>
        </Col>
      </Row>
      <br />
      <Table
        pagination={{ total: paramSearch.role ? data.length : totalRecords, pageSize: 5 }}
        onChange={onChangeTable}
        showSorterTooltip={false}
        sortDirections={['descend']}
        dataSource={data}
        columns={columns}
        scroll={{ x: 800 }}
        loading={loading}
        rowKey='id'
      />
      {renderModal}
    </section>
  );
};

export default Index;
