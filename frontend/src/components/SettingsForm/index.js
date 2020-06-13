import React from 'react';
import { Form, InputNumber, Button, Radio, Row, Col, notification } from 'antd';
import { fetchTool } from '../../utils/fetch';
import './index.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 12,
    },
};

class SettingsForm extends React.Component {
    formRef = React.createRef();

    onFinish = async (values) => {
        return this.props.changeStateMode('start');
        const result = await fetchTool("/administrator/set_parameter", values);
        console.log(result);
        if (result.code === 200) {
            this.props.changeStateMode('start');
        } else {
            notification['error']({
                message: '修改失败',
                description: '服务失败',
                duration: 2,
            });
        }
    };

    render() {

        return (
            <Row>
                <Col span={8} ></Col>
                <Col span={8} style={{ textAlign: 'left' }} >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                        initialValues={{
                            'mode': '0',
                            'top_temp': 35,
                            'bottom_temp': 10,
                            'default_temp': 20,
                            'default_speed': '0',
                            'room_num': 5,
                            'high_rate': 0.05,
                            'mid_rate': 0.03,
                            'low_rate': 0.01,
                            'allow_num': 3,
                        }}
                    >
                        <Form.Item name="mode" label="模式" rules={[{ required: true }]} >
                            <Radio.Group >
                                <Radio.Button value="0">冷模式</Radio.Button>
                                <Radio.Button value="1">暖模式</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="top_temp" label="最高温度" rules={[{ required: true }]} >
                            <InputNumber
                                min={10}
                                max={35}
                                formatter={value => `${value}℃`}
                                parser={value => value.replace('℃', '')}
                            />
                        </Form.Item>
                        <Form.Item name="bottom_temp" label="最低温度" rules={[{ required: true }]} >
                            <InputNumber
                                min={10}
                                max={35}
                                formatter={value => `${value}℃`}
                                parser={value => value.replace('℃', '')}
                            />
                        </Form.Item>
                        <Form.Item name="default_temp" label="初始的目标温度" rules={[{ required: true }]} >
                            <InputNumber
                                min={10}
                                max={35}
                                formatter={value => `${value}℃`}
                                parser={value => value.replace('℃', '')}
                            />
                        </Form.Item>
                        <Form.Item name="default_speed" label="初始的目标风速" rules={[{ required: true }]} >
                            <Radio.Group >
                                <Radio.Button value="0">低速</Radio.Button>
                                <Radio.Button value="1">中速</Radio.Button>
                                <Radio.Button value="2">高速</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="high_rate" label="高速风费率" rules={[{ required: true }]} >
                            <InputNumber min={0} max={1} step={0.01} />
                        </Form.Item>
                        <Form.Item name="mid_rate" label="中速风费率" rules={[{ required: true }]} >
                            <InputNumber min={0} max={1} step={0.01} />
                        </Form.Item>
                        <Form.Item name="low_rate" label="低速风费率" rules={[{ required: true }]} >
                            <InputNumber min={0} max={1} step={0.01} />
                        </Form.Item>
                        <Form.Item name="room_num" label="房间数" rules={[{ required: true }]} >
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                        <Form.Item name="allow_num" label="可被调度的房间数" rules={[{ required: true }]} >
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                        <Form.Item  {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交设置
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8} ></Col>
            </Row>
        );
    }

}

export default SettingsForm;