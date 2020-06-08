import React from 'react';
import { Form, InputNumber, Button, Radio, Row, Col } from 'antd'
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

    onFinish = values => {
        console.log(values);
        this.props.changeStateMode('start');
    };

    // ○ mode：0为冷模式，1为暖模式
	// ○ top_temp：最高温度，float
	// ○ bottom_temp：最低温度，float
	// ○ default_temp：房间初始的目标温度，float
	// ○ default_speed：房间的初始的目标风速，0为低速，1为中速，2为高速
	// ○ high_rate：高速风费率，float
	// ○ mid_rate：中速风费率，float
	// ○ low_rate：低速风费率，float
    // ○ room_num：房间数，int
    
	// ○ allow_num：可被调度的房间数，int


    render() {

        return (
            <Row>
                <Col span={8} ></Col>
                <Col span={8} style={{ textAlign: 'left' }} >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                        initialValues={{
                            'bottom_temp': 10,
                            'top_temp': 35,
                            'mode': '0',
                            'default_temp': 20,
                            'default_speed': '0',
                            'room_num': 5,
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