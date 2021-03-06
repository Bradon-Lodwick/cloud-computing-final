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

		if (this.props.extraInfo != ''){
			haslink = true;
		}

		if (this.state.width > 900) {
			cardType = "-" + this.props.orientation;
		}
		else {
			cardType = "-compact"
		}

		var text_side = (
            <div className="col-md-6">
                <div className="row">
                    <h2 className='title'> {this.props.title} </h2>
                </div>
                <div className="row">
                    <p className='description'>
                    {this.props.description}
                    </p>
                </div>
            </div>
		)

		var image_side = (
            <div className="col-md-6">
                <img src={this.props.url} className="image" width="auto" height="400"/>
            </div>

		)

		return (
			<div className="col-md-12">
			    <div className="shadow-box">
			        <div className="row">
			            { this.props.orientation == 'left' ? image_side : text_side }
			            { this.props.orientation == 'left' ? text_side : image_side }
                    </div>
                    { this.props.personal_page == 'true'
                        ?   <div className={"moreInfo" + cardType}>
                                <a className="linkText" href={this.props.edit_link}>EDIT PROJECT</a>
                            </div>
                         : <div />
                    }
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
