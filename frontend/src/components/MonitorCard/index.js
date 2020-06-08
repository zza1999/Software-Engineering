import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import './index.css';

class MonitorCard extends React.Component {

    handlePowerOff = () => {
        this.props.handlePowerOff();
        console.log('中央空调关机');
    }

    render() {
        return (
            <div className="site-card-wrapper">
                <Button danger onClick={this.handlePowerOff} >关机</Button>
                <Row gutter={16} >
                    <Col span={8} >
                        <Card title="101 房间" >
                            Card content
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card title="101 房间" >
                            Card content
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card title="101 房间">
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default MonitorCard;