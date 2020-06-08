import React from 'react';
import { Form, Input, Button, Radio } from 'antd'
import './index.css';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 15,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 12,
        span: 12,
    },
};

class SettingsForm extends React.Component {
    formRef = React.createRef();

    onGenderChange = value => {
        this.formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

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
            <div>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input style={{ maxWidth: 100 }} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item  {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交设置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

export default SettingsForm;