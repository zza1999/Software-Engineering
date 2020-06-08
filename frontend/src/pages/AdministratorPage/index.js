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
			isWorking: true,
			state_mode: 'setting'
		})
	}

	handlePowerOff = () => {
		this.setState({
			isWorking: false,
			state_mode: 'setting'
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
		const { isWorking, state_mode } = this.state;
		console.log(state_mode)

		return (
			<Row >
				<Col span={2}></Col>
				<Col span={20} className={isWorking && state_mode !== 'start' ? "col-on-style" : "col-off-style"}>
					{
						isWorking === false ?
							<Button onClick={this.handlePowerOn} >中央空调开机</Button> :
							this.switchMode()
					}
				</Col>
				<Col span={2}></Col>
			</Row>
		);
	}

}

export default AdministratorPage;