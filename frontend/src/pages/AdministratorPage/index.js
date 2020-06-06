import React from 'react';
import { Button } from 'antd';

class AdministratorPage extends React.Component {

	handleChangePage = (e, value)=> {
		console.log(value);
		console.log('-----');
	}

	render() {
		return (
			<div className="HomePage">
				<Button onClick={this.handleChangePage.bind("a")}>界面</Button>
				<Button onClick={this.handleChangePage.bind("b")}>界面</Button>
			</div>
		);
	}

}

export default AdministratorPage;