'use strict';


class ProfileCard extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			width: 0,
			height: 0,
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
	  this.setState({ width: window.outerWidth, height: window.innerHeight});
	}

	render(){
		var cardType;
		var haslink = false;

		if (this.props.url != null){
			haslink = true;
		}

		if (this.state.width > 900) {
			cardType = "-" + this.props.orientation;
		}
		else {
			cardType = "-compact"
		}

		return (
			<div className={"profileCardDiv" + cardType}>
				<div className={"profileCardGrid" + cardType}>
					<div className="profileTitle">
						<h2 className='title'> {this.props.name} </h2>
					</div>
					<div className={"picture" + cardType}>
						<img src={this.props.photo} />
					</div>
					<div className={"information" + cardType}>
						<p className='description'>
						{this.props.description}
						</p>
					</div>
					{ haslink
						?	<div className={"moreInfo" + cardType}>
								<a className="linkText" href={this.props.url}>View Portfolio</a>
							</div>
						: <div />
					}
				</div>
			</div>
		)
	}
}
