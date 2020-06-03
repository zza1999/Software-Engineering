import React from 'react';
import './App.css';

class App extends React.Component {
	state = {
		articleList: null
	}

	componentWillMount() {
		fetch('/articles/')
			.then(response => response.json())
			.then(result => {
				this.setState({ articleList: result })
				console.log(result)
			})
			.catch(e => e);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<p>{this.state.articleList ? this.state.articleList[0].body : 'null'}</p>
				</header>
			</div>
		);
	}

}

export default App;
