import React from 'react';
import { Row, Col, Button, Select, Space, notification } from 'antd';
import CustomerCard from '../../components/CustomerCard';
import './index.css';

const { Option } = Select;
var options = [];
// ■ is_check_in：判断是否入住，bool
// ■ mode：0为冷模式，1为热模式
// ■ top_temp：最高温度，float
// ■ bottom_temp：最低温度，float
// ■ default_temp：空调刚刚打开，向服务器询问默认的空调温度，float
// ■ default_speed：房间的初始的风速，0为低速，1为中速，2为高速
// ■ default_rate：房间初试的费率，float

class CustomerPage extends React.Component {
	componentWillMount() {
		options = [];
		for (let i = 101; i < 106; i++) {
			options.push(<Option key={i}>{i}</Option>);
		}
	}

	state = {
		isWorking: false,
		room_id: 101,
		bottom_temp: 30.0,
		top_temp: 10.0,
		mode: 1,
		speed: 0,
		cur_temp: 25.3,
		cur_cost: 50.5,
		target_temp: 25
	}

	handleChange = (value) => {
		console.log(value);
		this.setState({
			room_id: value
		})
	}

	handlePowerOn = () => {
		const is_check_in = true;
		if (is_check_in) {
			this.setState({
				isWorking: true
			})
		} else {
			notification['error']({
				message: '打开失败',
				description: '未入住无法打开空调',
				duration: 2,
			});
		}
	}

	handlePowerOff = () => {
		this.setState({
			isWorking: false
		})
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
							isWorking ? <CustomerCard {...this.state} handlePowerOff={this.handlePowerOff} /> : null
						}
					</Col>
					<Col span={8}></Col>
				</Row>
			</div>
		);
	}

}

export default CustomerPage;