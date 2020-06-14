import React from 'react';
import { Row, Col, Button, Select, Space, notification } from 'antd';
import CustomerCard from '../../components/CustomerCard';
import { fetchTool } from '../../utils/fetch.js'
import './index.css';

const { Option } = Select;
var options = [];

class CustomerPage extends React.Component {
	componentWillMount() {
		options = [];
		for (let i = 301; i < 312; i++) {
			options.push(<Option key={i}>{i}</Option>);
		}
	}

	state = {
		isWorking: false,
		room_id: 305,
		bottom_temp: 30.0,
		top_temp: 10.0,
		mode: 1,
		speed: 0,
		cur_temp: 25.3,
		cur_cost: 50.5,
		cur_rate: 0,
		target_temp: 25,
		state: 1,
	}

	handleChange = (value) => {
		console.log(value);
		this.setState({
			room_id: value
		})
	}

	handlePowerOn = async () => {
		const result = await fetchTool("/customer/power_on", { room_id: this.state.room_id });
		console.log(result);
		if (result.code === 200) {
			const {
				is_check_in, bottom_temp, top_temp, mode,
				default_rate, default_speed, default_temp
			} = result.data;
			console.log(result.data)
			if (is_check_in) {
				this.setState({
					isWorking: true,
					bottom_temp, top_temp, mode,
					cur_rate: default_rate,
					cur_cost: 0,
					speed: default_speed,
					cur_temp: 14,
					target_temp: parseInt(default_temp),
					state: 1
				})
			} else {
				notification['error']({
					message: '打开失败',
					description: '未入住无法打开空调',
					duration: 2,
				});
			}
		} else {
			notification['error']({
				message: '打开失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	handlePowerOff = async () => {
		const result = await fetchTool("/customer/power_off", { room_id: this.state.room_id });
		console.log(result);
		if (result.code === 200) {
			this.setState({
				isWorking: false
			})
		} else {
			notification['error']({
				message: '打开失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	changeAttribute = (values) => {
		this.setState({ ...values });
	}

	render() {
		const { isWorking, room_id } = this.state;
		return (
			<div>
				<Row >
					<Col span={8}></Col>
					<Col span={8} className={isWorking ? "col-on-style" : "col-off-style"}>
						{
							isWorking === false ? <Space>
								<Select
									defaultValue={room_id}
									style={{ width: 90 }}
									onChange={this.handleChange}
								>
									{options}
								</Select>
								<Button onClick={this.handlePowerOn} >空调开机</Button>
							</Space> : null
						}
						{
							isWorking ? <CustomerCard {...this.state}
								handlePowerOff={this.handlePowerOff}
								changeAttribute={this.changeAttribute}
							/> : null
						}
					</Col>
					<Col span={8}></Col>
				</Row>
			</div>
		);
	}

}

export default CustomerPage;