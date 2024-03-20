import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerButton } from '@components/DrawerButton';
import { DrawerTag } from '@components/DrawerTag';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsSelector } from '@redux/training/training.slice';
import { Space, Typography, Input, InputNumber, Row, Col, Form } from 'antd';

type DrawerFormItemProps = {
    id?: string | undefined;
};

export const DrawerFormItem: FC<DrawerFormItemProps> = () => {
    const { trainings } = useAppSelector(trainingsSelector);
    const index = trainings.length;

    return (
        <>
            <Form.List name='exercises'>
                {(fields, { add }) => {
                    console.log('fields', fields);
                    return (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <>
                                    <Space
                                        key={key}
                                        direction='vertical'
                                        style={{ margin: '24px 0' }}
                                    >
                                        <Form.Item name={[name, 'name']} {...restField} noStyle>
                                            <Input
                                                size='small'
                                                placeholder='Упражнение'
                                                data-test-id={`modal-drawer-right-input-exercise${index}`}
                                            />
                                        </Form.Item>
                                        <Space
                                            size={32}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}
                                        >
                                            <Space direction='vertical'>
                                                <DrawerTag>Подходы</DrawerTag>
                                                <Form.Item
                                                    name={[name, 'approaches']}
                                                    style={{ paddingBottom: 0 }}
                                                    noStyle
                                                    {...restField}
                                                >
                                                    <InputNumber
                                                        addonBefore={<PlusOutlined />}
                                                        min={1}
                                                        placeholder={'1'}
                                                        size='small'
                                                        data-test-id={`modal-drawer-right-input-approach${index}`}
                                                    />
                                                </Form.Item>
                                            </Space>
                                            <Space direction='vertical'>
                                                <Row gutter={14}>
                                                    <Col span={12}>
                                                        <DrawerTag>Вес, кг</DrawerTag>
                                                    </Col>
                                                    <Col span={12}>
                                                        <DrawerTag>Количество</DrawerTag>
                                                    </Col>
                                                </Row>
                                                <Space size={2}>
                                                    <Form.Item
                                                        name={[name, 'weight']}
                                                        noStyle
                                                        {...restField}
                                                    >
                                                        <InputNumber
                                                            min={0.001}
                                                            placeholder='0'
                                                            size='small'
                                                            data-test-id={`modal-drawer-right-input-weight${index}`}
                                                        />
                                                    </Form.Item>
                                                    <Typography.Text type='secondary'>
                                                        X
                                                    </Typography.Text>
                                                    <Form.Item
                                                        name={[name, 'replays']}
                                                        noStyle
                                                        {...restField}
                                                    >
                                                        <InputNumber
                                                            min={1}
                                                            placeholder='3'
                                                            size='small'
                                                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                                                        />
                                                    </Form.Item>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Space>
                                </>
                            ))}
                            <Form.Item>
                                <DrawerButton onClick={() => add()}>Добавить ещё</DrawerButton>
                            </Form.Item>
                        </>
                    );
                }}
            </Form.List>
        </>
    );
};
