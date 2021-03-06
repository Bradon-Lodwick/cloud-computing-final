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

		if (this.state.width > 900) {
			cardType = "-" + this.props.orientation;
		}
		else {
			cardType = "-compact"
		}

		var text_side = (
            <div className="col-md-4">
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

		var video_side = (
            <div className="col-md-8">
                <div class="video-container">
                    <iframe
                        width="100%"
                        height="100%"
                        src={this.props.url.replace('/watch?v=', '/embed/')}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
		)

		return (
		    <div className="col-md-12">
			    <div className="shadow-box">
			        <div className="row">
			            { this.props.orientation == 'left' ? video_side : text_side }
			            { this.props.orientation == 'left' ? text_side : video_side }
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
