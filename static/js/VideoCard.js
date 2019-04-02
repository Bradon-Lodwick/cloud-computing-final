'use strict';

class VideoCard extends React.Component {
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

		if (this.props.extraInfo != null){
			haslink = true;
		}

		if (this.state.width > 900  && this.props.browser == "desktop") {
			cardType = "-" + this.props.orientation;
		}
		else {
			cardType = "-compact"
		}

		return (
			<div className={"videoCardDiv" + cardType}>
				<div className={"videoCardGrid" + cardType}>
					<div className="videoTitle">
						<h2 className='title'> {this.props.title} </h2>
					</div>
					<div className={"video" + cardType}>
						<iframe
							width="560"
							height="315"
							src={this.props.url.replace('/watch?v=', '/embed/')}
							frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div className={"information" + cardType}>
						<p className='description'>
						{this.props.description}
						</p>
					</div>
					{ haslink
						?	<div className={"moreInfo" + cardType}>
								<a className="linkText" href={this.props.extraInfo}>FIND OUT MORE</a>
							</div>
						: <div />
					}
				</div>
			</div>
		)
	}
}
