import React from 'react';
import { Space, Card, Statistic, Row, Col, Progress, Button, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';

class CustomerCard extends React.Component {
    state = {
        percent: 40,
        step: 4,
    };

    increase = () => {
        let { top_demp } = this.props;
        let { step } = this.state;
        let top_percent = (top_demp - 10) * step;
        top_percent = top_percent > 100 ? 100 : top_percent;
        let percent = this.state.percent + step;

        if (percent > top_percent) {
            percent = top_percent;
        }
        this.setState({ percent });
    };

    decline = () => {
        let { step } = this.state;
        let { bottom_demp } = this.props;
        let bottom_percent = (bottom_demp - 10) * step;
        bottom_percent = bottom_percent < 0 ? 0 : bottom_percent;
        let percent = this.state.percent - step;

        if (percent < bottom_percent) {
            percent = bottom_percent;
        }
        this.setState({ percent });
    };

    handlePowerOff = () => {
        console.log('关机');
        this.props.handlePowerOff();
    }

    render() {
        const { room_id, mode, cur_temp, cur_cost } = this.props;
        const { percent, step } = this.state;

        return (
            <Card title={room_id + " 房间"} bordered={false}>

                <Row>
                    <Col span={4} ></Col>
                    <Col span={10} >
                        <Progress
                            type="circle"
                            percent={percent}
                            status={mode === 1 ? "exception" : null}
                            format={percent => `${percent / step + 10} ℃`}
                        />
                        <div>
                            <Button.Group>
                                <Space>
                                    <Button onClick={this.decline} className="button-style" icon={<MinusOutlined />} />
                                    <Button onClick={this.increase} className="button-style" icon={<PlusOutlined />} />
                                </Space>
                            </Button.Group>
                        </div>
                    </Col>
                    <Col span={6}>
                        {
                            mode === 0 ?
                                <svg t="1591453252044" class="icon-cold-style" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4904" width="64" height="64"><path d="M325.138286 760.137143c12.854857 0 22.710857-11.154286 22.710857-26.569143L347.428571 636.288l39.424-22.710857 107.154286-70.710857-7.296 128.128v45.44l-84.845714 48c-13.714286 7.716571-18.011429 21.851429-11.154286 32.987428 7.296 13.293714 21.010286 14.994286 34.285714 7.296l61.714286-35.145143v77.568c0 15.853714 10.294857 27.008 25.289143 27.008 15.853714 0 25.289143-11.154286 25.289143-27.008v-77.568l61.275428 35.145143c13.293714 7.716571 27.008 5.997714 34.724572-6.857143 6.857143-11.574857 2.139429-25.709714-11.574857-33.426285l-84.425143-48v-45.44l-7.296-128.146286 107.154286 70.290286L676.571429 635.849143l-0.859429 97.718857c0 15.433143 9.874286 26.569143 23.149714 26.569143 15.414857 0 23.570286-11.574857 23.570286-26.569143V662.857143l67.712 39.003428c13.714286 7.716571 27.849143 4.717714 35.145143-8.996571 7.716571-12.854857 3.419429-27.867429-9.874286-35.145143l-67.693714-39.003428 61.275428-35.565715c13.293714-7.716571 18.870857-20.571429 11.154286-33.426285-6.857143-11.574857-20.571429-14.994286-34.285714-6.857143l-84.004572 49.28-39.424-22.710857L547.565714 512l114.870857-57.417143 39.424-23.149714 84.004572 49.28c13.275429 8.137143 27.849143 4.717714 34.706286-6.436572 7.277714-13.275429 1.718857-26.148571-11.574858-33.846857l-60.854857-35.565714 67.291429-38.582857c13.714286-8.137143 17.993143-21.851429 9.856-35.565714-7.296-12.854857-21.430857-16.713143-35.145143-8.576l-67.712 39.003428-0.438857-71.131428c0-14.994286-7.716571-26.587429-23.131429-26.148572-13.293714 0-23.149714 10.715429-23.149714 26.148572L676.571429 387.693714l-39.424 22.710857-107.154286 70.290286 7.296-128.146286v-45.421714L621.714286 259.145143c13.714286-7.716571 18.432-21.869714 11.574857-33.005714-7.716571-13.275429-21.430857-14.994286-34.724572-7.277715l-61.275428 35.145143V176.420571c0-15.853714-9.435429-26.569143-25.289143-26.569142-14.994286 0-25.289143 10.715429-25.289143 26.569142v77.586286l-61.714286-35.145143c-13.275429-7.296-26.989714-5.997714-34.285714 7.277715-6.857143 11.154286-2.56 25.289143 11.154286 33.005714l84.845714 48v45.421714l7.296 128.585143-107.154286-70.729143L347.428571 387.291429l0.420572-97.28c0-15.433143-9.856-26.148571-22.710857-26.148572-15.414857 0-23.570286 11.154286-23.570286 26.148572l-0.420571 70.710857-67.291429-38.582857c-13.275429-7.716571-27.849143-4.278857-35.145143 8.576-8.137143 13.714286-3.419429 27.849143 9.874286 35.565714l67.273143 38.582857-60.854857 35.565714c-13.293714 7.716571-19.291429 20.150857-11.574858 33.865143 6.436571 11.136 21.430857 14.555429 34.724572 6.418286l83.986286-48.859429 39.424 22.710857L476.434286 512l-114.870857 57.417143-39.424 22.729143-84.004572-49.298286c-13.714286-8.137143-27.849143-4.699429-34.285714 6.436571-7.277714 13.714286-2.139429 26.148571 11.154286 33.865143l60.854857 35.565715-67.291429 39.003428c-13.275429 7.277714-17.554286 22.272-9.856 35.145143 7.716571 13.714286 21.851429 16.274286 35.145143 8.996571l67.291429-39.003428 0.420571 70.710857c0 14.994286 8.137143 26.569143 23.588571 26.569143z" p-id="4905" fill="#1296db"></path>
                                </svg> :
                                <svg t="1591452156757" class="icon-hot-style" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1605" width="32" height="32"><path d="M512 256q69.674667 0 128.512 34.346667t93.184 93.184 34.346667 128.512-34.346667 128.512-93.184 93.184-128.512 34.346667-128.512-34.346667-93.184-93.184-34.346667-128.512 34.346667-128.512 93.184-93.184 128.512-34.346667zM240.682667 740.650667q17.664 0 30.165333 12.672t12.501333 30.336q0 17.322667-12.672 29.994667l-60.330667 60.330667q-12.672 12.672-29.994667 12.672-17.664 0-30.165333-12.501333t-12.501333-30.165333q0-18.005333 12.330667-30.336l60.330667-60.330667q12.672-12.672 30.336-12.672zM512 853.333333q17.664 0 30.165333 12.501333t12.501333 30.165333l0 85.333333q0 17.664-12.501333 30.165333t-30.165333 12.501333-30.165333-12.501333-12.501333-30.165333l0-85.333333q0-17.664 12.501333-30.165333t30.165333-12.501333zM42.666667 469.333333l85.333333 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-85.333333 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333zM512 341.333333q-70.656 0-120.661333 50.005333t-50.005333 120.661333 50.005333 120.661333 120.661333 50.005333 120.661333-50.005333 50.005333-120.661333-50.005333-120.661333-120.661333-50.005333zM783.658667 740.650667q17.322667 0 29.994667 12.672l60.330667 60.330667q12.672 12.672 12.672 30.336 0 17.322667-12.672 29.994667t-29.994667 12.672q-17.664 0-30.336-12.672l-60.330667-60.330667q-12.330667-12.330667-12.330667-29.994667t12.501333-30.336 30.165333-12.672zM180.352 137.344q17.322667 0 29.994667 12.672l60.330667 60.330667q12.672 12.672 12.672 29.994667 0 17.664-12.501333 30.165333t-30.165333 12.501333q-18.005333 0-30.336-12.330667l-60.330667-60.330667q-12.330667-12.330667-12.330667-30.336 0-17.664 12.501333-30.165333t30.165333-12.501333zM512 0q17.664 0 30.165333 12.501333t12.501333 30.165333l0 85.333333q0 17.664-12.501333 30.165333t-30.165333 12.501333-30.165333-12.501333-12.501333-30.165333l0-85.333333q0-17.664 12.501333-30.165333t30.165333-12.501333zM896 469.333333l85.333333 0q17.664 0 30.165333 12.501333t12.501333 30.165333-12.501333 30.165333-30.165333 12.501333l-85.333333 0q-17.664 0-30.165333-12.501333t-12.501333-30.165333 12.501333-30.165333 30.165333-12.501333zM843.989333 137.344q17.322667 0 29.994667 12.672t12.672 29.994667q0 17.664-12.672 30.336l-60.330667 60.330667q-12.330667 12.330667-29.994667 12.330667-18.346667 0-30.506667-12.16t-12.16-30.506667q0-17.664 12.330667-29.994667l60.330667-60.330667q12.672-12.672 30.336-12.672z" p-id="1606" fill="#d81e06"></path>
                                </svg>
                        }
                        <Statistic title="当前温度" value={cur_temp} suffix="℃" />
                        <Statistic title="当前费用" value={cur_cost} prefix="￥" />
                    </Col>
                    <Col span={4} ></Col>
                </Row>
                <div className="div-style" >
                    <Space>
                        风速：
                        <Radio.Group defaultValue="0">
                            <Radio.Button value="0">低速</Radio.Button>
                            <Radio.Button value="1">中速</Radio.Button>
                            <Radio.Button value="2">高速</Radio.Button>
                        </Radio.Group>
                        <Button danger onClick={this.handlePowerOff}>关机</Button>
                    </Space>

                </div>
            </Card>
        );
    }

}

export default CustomerCard;