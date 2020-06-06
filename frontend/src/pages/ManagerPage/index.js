import React from 'react';
import { Button, Empty, Spin, Row, Col } from 'antd';
import './index.css';

var echarts = require('echarts');

class ManagerPage extends React.Component {
	state = {
		isGetReportForm: false,
		getReportFromLoading: false
	}

	handleGetReportForm = () => {
		this.setState({
			isGetReportForm: true,
			getReportFromLoading: true,
		});
		const self = this;
		setTimeout(function () {
			var myChart = echarts.init(document.getElementById('main'));
			var option = {
				title: {
					text: '示例'
				},
				tooltip: {},
				legend: {
					data: ['销量']
				},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
				},
				yAxis: {

				},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			};
			console.log(self)
			self.setState({ getReportFromLoading: false });
			myChart.setOption(option);
		}, 1000);
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
					<Col span={6}></Col>
					<Col span={12}>
						<div id="main" style={{ width: 600, height: 400 }}></div>
					</Col>
					<Col span={6}></Col>
				</Row>

			</div>
		);
	}

}

export default ManagerPage;