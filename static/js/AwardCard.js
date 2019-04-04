'use strict'

class AwardCard extends React.Component {
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




		return (
			<div className={'stacked-card-back' + cardType}>
				<div className={'stacked-card-information' + cardType}>
					<h3> {this.props.name} from {this.props.issuer} </h3>
					<h4> In relation to {this.props.associated_with} </h4>
					<p> {this.props.description} </p>
					<p> Received on {this.props.date_received}</p>
				</div>
			</div>
		)
	}
}
