import React from 'react';
import { Button } from 'antd';
import './index.css';

class MonitorCard extends React.Component {

    handlePowerOff = () => {
        this.props.handlePowerOff();
    }

    render() {
        return (
            <div>
                <Button danger onClick={this.handlePowerOff} >关机</Button>
            </div>
        );
    }

}

export default MonitorCard;