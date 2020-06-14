import React from 'react';
import { Row, Col, Button, Select, Space, Modal, notification } from 'antd';
import { RDRTable, BillTable } from '../../components/ReceptionTable.js';
import { fetchTool } from '../../utils/fetch.js'
import './index.css';

const { Option } = Select;
var options = [];

class ReceptionPage extends React.Component {
	componentWillMount() {
		options = [];
		for (let i = 305; i < 311; i++) {
			options.push(<Option key={i}>{i}</Option>);
		}
	}

	state = {
		room_id: 305,
		is_check_in: false,
		check_RDR: false,
		check_bill: false
	}

	handleChange = (value) => {
		console.log(value);
		this.setState({
			room_id: value
		})
	}

	handleCheckIn = async () => {
		const result = await fetchTool("/reception/check_in", { room_id: this.state.room_id });
		if (result.code === 200) {
			const is_check_in = result.is_check_in;
			if (is_check_in) {
						Modal.error({
							centered: true,
							title: '错误',
							content: '此房间已被入住',
						})

					} else {
						Modal.success({
							centered: true,
							content: '入住成功',
						})
						this.setState(is_check_in = true)
					}	
		} else{
			notification['error']({
				message: '入住失败',
				description: '服务失败',
				duration: 2,
			});
		}
		
	}

	handleCheckOut = async () => {
		const result = await fetchTool("/reception/check_out", { room_id: this.state.room_id });
		if (result.code === 200) {
			const is_check_in = result.is_check_in;
			if (is_check_in) {
				Modal.success({
					centered: true,
					content: '退房成功',
				})
				this.setState(is_check_in = false)
			} else {
				Modal.error({
					centered: true,
					title: '错误',
					content: '此房间还未入住',
				})
			}
		} else{
			notification['error']({
				message: '退房失败',
				description: '服务失败',
				duration: 2,
			});
		}		
	}

	handleCheckRDR = () => {
		const result = await fetchTool("/reception/check_RDR", { room_id: this.state.room_id });
		if (result.code === 200) {
			const is_check_in = result.is_check_in;
			if (is_check_in) {
				this.setState({
					check_RDR: true
				})
			} else {
				Modal.error({
					centered: true,
					title: '错误',
					content: '未入住无法打印详单',
				})
			}
		} else{
			notification['error']({
				message: '打印详单失败',
				description: '服务失败',
				duration: 2,
			});
		}		
	}

	handleRDROff = () => {
		this.setState({
			check_RDR: false
		})
	}

	handleCheckBill = () => {//这里！应该要拿到data
		const result = await fetchTool("/reception/check_RDR", { room_id: this.state.room_id });
		if (result.code === 200) {
			const is_check_in = result.is_check_in;
			if (is_check_in) {
				this.setState({
					check_bill: true
				})
			} else {
				Modal.error({
					centered: true,
					title: '错误',
					content: '未入住无法打印帐单',
				})
			}
		} else{
			notification['error']({
				message: '打印帐单失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	handleBillOff = () => {
		this.setState({
			check_bill: false
		})
	}

	render() {
		const { room_id, check_RDR, check_bill } = this.state;

		return (
			<div>
				<Row>
					<Col span={8}></Col>
					<Col span={8} className={"room-id-style"}>
						{
							<Space>
								<Select
									defaultValue={room_id}
									style={{ width: 90 }}
									onChange={this.handleChange}
								>
									{options}
								</Select>
								<Button onClick={this.handlePowerOn} >确认房号</Button>
							</Space>
						}
					</Col>
					<Col span={8}></Col>
				</Row>
				<Row>
					<Col span={4}></Col>
					<Col span={4} className={"request-style"}>
						{
							<Space direction="vertical" size="large">
								<Button onClick={this.handleCheckIn} >办理入住</Button>
								<Button onClick={this.handleCheckOut} >办理退房</Button>
								<Button onClick={this.handleCheckRDR} >打印详单</Button>
								<Button onClick={this.handleCheckBill} >打印账单</Button>
							</Space>
						}
					</Col>
					<Col span={14} className={"table-style"}>
					{//但是画表在Table里面！
						check_RDR ? <RDRTable {...this.state} handleRDROff={this.handleRDROff} /> : null
					}
					{
						check_bill ? <BillTable {...this.state} handleBillOff={this.handleBillOff} /> : null
					}
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}

}

export default ReceptionPage;