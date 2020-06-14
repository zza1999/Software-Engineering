import React from 'react';
import { Button, Empty, Spin, Row, Col, notification } from 'antd';
import { fetchTool } from '../../utils/fetch';
import './index.css';

var echarts = require('echarts');

class ManagerPage extends React.Component {
	state = {
		isGetReportForm: false,
		getReportFromLoading: false
	}

	getTitle = (label) => {
		switch (label) {
			case "times_of_on": return "空调开关次数";
			case "duration": return "服务的总时间";
			case "total_fee": return "总费用";
			case "times_of_dispatch": return "被调度次数";
			case "number_of_RDR": return "打印详单的次数";
			case "times_of_change_temp": return "改变目标温度的次数";
			case "times_of_change_speed": return "改变目标风速的次数";
			default: return 'test';
		}
	}

	getData = (data, label) => {
		const x = [];
		const y = [];
		for (let i in data) {
			const room = data[i];
			x.push(room.room_id);
			y.push(room[label]);
		}

		return { x, y };
	}

	getType = (label) => {
		switch (label) {
			case "times_of_on": return "bar";
			case "duration": return "bar";
			case "total_fee": return "line";
			case "times_of_dispatch": return "line";
			case "number_of_RDR": return "line";
			case "times_of_change_temp": return "line";
			case "times_of_change_speed": return "bar";
			default: return 'line';
		}
	}

	handleGetReportForm = async () => {
		this.setState({
			isGetReportForm: true,
			getReportFromLoading: true,
		});

		const result = await fetchTool("/manager/check_report", { list_room: [305, 306, 307] });
		if (result.code === 200) {
			this.setState({ getReportFromLoading: false });
			const labels = Object.keys(result.data[0]);
			for (let i in labels) {
				const label = labels[i];
				if (label !== 'room_id') {
					var myChart = echarts.init(document.getElementById(label));
					var data = this.getData(result.data, label);
					var option = {
						title: {
							text: this.getTitle(label)
						},
						tooltip: {},
						xAxis: {
							data: data.x
						},
						yAxis: {

						},
						color: "#3A86F9",
						series: [{
							name: this.getTitle(label),
							type: this.getType(label),
							data: data.y
						}]
					};
					myChart.setOption(option);
				}
			}
		} else {
			notification['error']({
				message: '请求失败',
				description: '服务失败',
				duration: 2,
			});
		}
	}

	render() {
		return (
			<div className="manage-style">
				{
					this.state.isGetReportForm === false ?
						<Empty description={false} >
							<Button onClick={this.handleGetReportForm}>生成报表</Button>
						</Empty> : null
				}
				{
					this.state.getReportFromLoading === true ?
						<Spin size="large" /> : null
				}
				<Row>
					<Col span={3}></Col>
					<Col span={18} style={{ textAlign: 'center' }}>
						<div id="total_fee" style={{ width: 1200, height: 300 }}></div>
					</Col>
					<Col span={3}></Col>
				</Row>
				<Row>
					<Col span={3}></Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="number_of_RDR" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="times_of_change_speed" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="times_of_change_temp" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={3}></Col>
				</Row>
				<Row>
					<Col span={3}></Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="times_of_dispatch" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="times_of_on" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={6} style={{ textAlign: 'center' }}>
						<div id="duration" style={{ width: 400, height: 300 }}></div>
					</Col>
					<Col span={3}></Col>
				</Row>
			</div>
		);
	}

}

export default ManagerPage;