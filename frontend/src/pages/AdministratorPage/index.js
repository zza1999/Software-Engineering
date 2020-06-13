import React from 'react';
import { Button, Row, Col, notification } from 'antd';
import SettingsForm from '../../components/SettingsForm';
import MonitorCard from '../../components/MonitorCard';
import { fetchTool } from '../../utils/fetch';
import './index.css';

class AdministratorPage extends React.Component {
	state = {
		isWorking: false,
		state_mode: 'setting',
	}

	handlePowerOn = async () => {
		const result = await fetchTool("/administrator/power_on", {});
		console.log(result);
		if (result.code === 200) {
			this.setState({
				isWorking: true,
				state_mode: 'setting'
			})
		} else {
			notification['error']({
				message: '打开失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	handlePowerOff = async () => {
		const result = await fetchTool("/administrator/power_off", {});
		console.log(result);
		if (result.code === 200) {
			this.setState({
				isWorking: false,
				state_mode: 'setting'
			})
		} else {
			notification['error']({
				message: '关机失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	changeStateMode = (value) => {
		console.log(value)
		this.setState({
			state_mode: value
		})
	}

	handleStart = async () => {
		const result = await fetchTool("/administrator/start_up", {});
		console.log(result);
		if (result.code === 200) {
			this.setState({
				state_mode: 'monitor'
			})
		} else {
			notification['error']({
				message: '运行失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	switchMode = () => {
		switch (this.state.state_mode) {
			case 'setting': return <SettingsForm changeStateMode={this.changeStateMode} ></SettingsForm>;
			case 'start': return <Button onClick={this.handleStart} >开始运行</Button>
			case 'monitor': return <MonitorCard isWorking={this.state.isWorking} handlePowerOff={this.handlePowerOff} ></MonitorCard>
			default: return <div></div>
		}
	}

	render() {
		const { isWorking, state_mode } = this.state;
		console.log(state_mode)

		return (
			<Row >
				<Col span={2}></Col>
				<Col span={20} className={isWorking && state_mode !== 'start' ? "cols-on-style" : "cols-off-style"}>
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