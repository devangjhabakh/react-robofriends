import React, { Component } from 'react';
import CardList from '../Components/CardList';
import { robots } from '../robots';
import 'tachyons';
import SearchBox from '../Components/SearchBox';
import './App.css'
import Scroll from '../Scroll'
import ErrorBoundary from '../Components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

//A parent can pass around the STATE of its children, among its children.
//State can cause changes to our app. State usually lives in the parent component.
//A React object executes functions in the order: constructor() -> render() -> componentDidMount()
//and render() is called again and again every time the "state" object changes.
class App extends Component{

	componentDidMount(){
		this.props.onRequestRobots();
	}

	render(){
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending?<h1 className = 'tc f1'> Loading 😔😔😔 </h1>:
			(
			<div className = 'tc'>
				<h1> Robofriends </h1>
				<SearchBox searchChange = {onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
			);
		
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);