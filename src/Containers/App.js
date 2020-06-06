import React, { Component } from 'react';
import CardList from '../Components/CardList';
import { robots } from '../robots';
import 'tachyons';
import SearchBox from '../Components/SearchBox';
import './App.css'
import Scroll from '../Scroll'
import ErrorBoundary from '../Components/ErrorBoundary';

//A parent can pass around the STATE of its children, among its children.
//State can cause changes to our app. State usually lives in the parent component.
//A React object executes functions in the order: constructor() -> render() -> componentDidMount()
//and render() is called again and again every time the "state" object changes.
class App extends Component{
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield : ''
		}
	}

	componentDidMount(){
		fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json())
		.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
	}

	render(){
		const { robots, searchfield } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !robots.length?<h1> Loading 😔😔😔 </h1>:
			(
			<div className = 'tc'>
				<h1> Robofriends </h1>
				<SearchBox searchChange = {this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
			);
		
		
	}
}

export default App;