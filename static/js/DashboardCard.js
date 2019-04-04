'use strict'

class DashboardCard extends React.Component {
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
			<div className={'profile-card-back' + cardType}>
				<div className='profile-image' style={{backgroundImage: "url('" + this.props.url + "')"}}/>
				<div className={'information' + cardType}>
					<h1> {this.props.name} </h1>
					<h2> {this.props.email} </h2>
				</div>
				<a href={this.props.editpage} className='edit-button'>Edit</a>
				<div className='skills'>
					<div className={'skills-grid' + cardType}>
						{
							this.props.skills.map((skill, index) =>
								{
									return <div className='skill' key={'item_' + index}> {skill} </div>
								}
							)
						}
					</div>
				</div>
			</div>
		)
	}
}
