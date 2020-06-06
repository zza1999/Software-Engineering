import React from 'react';
import { Button } from 'antd';
import './index.css';

class HomePage extends React.Component {
	// state = {
	// 	articleList: null
	// }

	handleChangePage = (value) => {
		this.props.history.push({ pathname: '/' + value });
	}

	// componentWillMount() {
	// 	fetch('/articles/')
	// 		.then(response => response.json())
	// 		.then(result => {
	// 			this.setState({ articleList: result })
	// 			console.log(result)
	// 		})
	// 		.catch(e => e);
	// }

	// render() {
	// 	return (
	// 		<div className="App">
	// 			<header className="App-header">
	// 				<p>{this.state.articleList ? this.state.articleList[0].body : 'null'}</p>
	// 			</header>
	// 		</div>
	// 	);
	// }

	render() {
		return (
			<div className="HomePage">
				<Button onClick={this.handleChangePage.bind(this, "customer")}>顾客界面</Button>
				<Button onClick={this.handleChangePage.bind(this, "administrator")}>管理员界面</Button>
				<Button onClick={this.handleChangePage.bind(this, "reception")}>前台界面</Button>
				<Button onClick={this.handleChangePage.bind(this, "manager")}>经理界面</Button>
			</div>
		);
	}

}

export default HomePage;