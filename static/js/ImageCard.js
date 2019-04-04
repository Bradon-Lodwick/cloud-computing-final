'use strict';

class ImageCard extends React.Component {
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

		if (this.state.width > 900) {
			cardType = "-" + this.props.orientation;
		}
		else {
			cardType = "-compact"
		}

		return (
			<div className="col-md-12">
			    <div className="shadow-box">
			        <div className="row">
			            <div className={this.props.orientation == 'left' ? "col-md-4" : "col-md-8"}>
                            <div className="row">
                                <h2 className='title'> {this.props.title} </h2>
                            </div>
                            <div className="row">
                                <p className='description'>
                                {this.props.description}
                                </p>
                            </div>
                        </div>
			            <div className={this.props.orientation == 'left' ? "col-md-8" : "col-md-4"}>
                            <img src={this.props.url} className="image"/>
                        </div>
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
