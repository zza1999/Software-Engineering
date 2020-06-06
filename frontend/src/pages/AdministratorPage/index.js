import React from 'react';
import { Button, Row, Col } from 'antd';
import SettingsForm from '../../components/SettingsForm'
import MonitorCard from '../../components/MonitorCard'
import './index.css';

class AdministratorPage extends React.Component {
	state = {
		isWorking: false,
		state_mode: 'setting',
	}

	handlePowerOn = () => {
		this.setState({
			isWorking: true
		})
	}

	handlePowerOff = () => {
		this.setState({
			isWorking: false
		})
	}

	changeStateMode = (value) => {
		console.log(value)
		this.setState({
			state_mode: value
		})
	}

	handleStart = () => {
		this.setState({
			state_mode: 'monitor'
		})
	}

	switchMode = () => {
		switch (this.state.state_mode) {
			case 'setting': return <SettingsForm changeStateMode={this.changeStateMode} ></SettingsForm>;
			case 'start': return <Button onClick={this.handleStart} >开始运行</Button>
			case 'monitor': return <MonitorCard handlePowerOff={this.handlePowerOff} ></MonitorCard>
		}
	}

	render() {
		const { isWorking } = this.state;

		return (
			<Row >
				<Col span={8}></Col>
				<Col span={8} className={isWorking ? "col-on-style" : "col-off-style"}>
					{
						isWorking === false ?
							<Button onClick={this.handlePowerOn} >中央空调开机</Button> :
							this.switchMode()
					}
				</Col>
				<Col span={8}></Col>
			</Row>
		);
	}

}

export default AdministratorPage;