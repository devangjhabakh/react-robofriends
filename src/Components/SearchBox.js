import React, {Component} from 'react';

class SearchBox extends Component{
	render(){
		return(
			<div className = "tc f1">
				<input type="search" 
				placeholder='search robots...' 
				className = 'pa3 ba b--green bg-lightest-blue'
				onChange = {this.props.searchChange}></input>
			</div>
			);
	}
}

export default SearchBox;