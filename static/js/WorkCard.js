'use strict'

class WorkCard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			width: 0
		}
	}
	
	componentDidMount(){
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
	}

	updateWindowDimensions() {
	  this.setState({ width: window.innerWidth, height: window.innerHeight});
	}
	
	render() {
		var cardType;

		if (this.state.width > 900) {
			cardType = "";
		}
		else {
			cardType = "-compact"
		}

		let end_date;
		if (this.props.end_date != "None") {
		    end_date = this.props.end_date;
		} else {
		    end_date = "Present";
		}

		return (
			<div className={'stacked-card-back' + cardType}>
				<div className={'stacked-card-information' + cardType}>
					<h3> {this.props.title} at {this.props.company} </h3>
					<p> {this.props.description} </p>
					<p> From {this.props.start_date} to {end_date} </p>
				</div>
			</div>
		)
	}
}
