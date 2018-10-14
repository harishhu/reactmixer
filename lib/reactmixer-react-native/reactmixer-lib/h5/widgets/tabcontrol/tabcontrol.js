import React from "react"
import PropTypes from 'prop-types';
import $ from 'jquery';

const {
	ZAComponent,
	StyleSheet,
	View,
	Image,
	Text
} = global.reactmixer;

import "./tabcontrol.scss"

class TabControl extends ZAComponent{
	constructor(props) {
		super(props)

		this.state = {
			currentIndex: 0,
			titleHeight: '44px',
			contentHeight: '100%'
		}

		this.check_item_index = this.check_item_index.bind(this);
		this.titleWidth = 100 / this.props.tabtitles.length + "%";
		this.titleIndicatorWidth = 0;

		this.firstRender = true;
		this.isheadertop = this.props.tabposition == 'bottom' ? false : true;
	}

	static defaultProps = {
		showheader : true
	}

	// static propTypes = {
	// 	showheader: PropTypes.boolValue
	// }

	check_title_index( index ){
		return index == this.state.currentIndex ? "tab_title tab_title_active" : "tab_title"
	}

	getTitleIndicatorWidth(index){
		return index == this.state.currentIndex ? '100%' : "0px";
	}

	setSelectItem(index){
		this.setState({ currentIndex : index });

		if(this.props.tabItemChanged){
			this.props.tabItemChanged(index);
		}
	}

	check_item_index( index ){
		let data = index == this.state.currentIndex ? "tab_item tab_item_show" : "tab_item";
		return data;
	}

	getTitleDisplayStyle(){
		return this.props.showheader ? 'flex' : 'none';
	}

	componentDidMount() {
		if (this.firstRender) {
			this.firstRender = false;
			if (this.props.showheader) {
				setTimeout(() => {
					let item = $('.tabscontainer');
					let title = $('.tab_title_wrap');

					let tmp = (item.height() - title.height()) + 'px';
					this.setState({
						contentHeight: tmp
					});
				}, 50);
			}
		}
	}

	renderTitle = ()=>{
		let rendertitle = (title)=>{
			return (
				<a>{ title }</a>
			)
		}

		let renderindicator = (index)=>{
			return (
				<line style={{width: this.getTitleIndicatorWidth(index)}}/>
			)
		}

		const render1 = this.isheadertop ? rendertitle : renderindicator;
		const render2 = this.isheadertop ? renderindicator : rendertitle;
		const justifyStyle = this.isheadertop ? 'flex-start' : 'flex-end';

		return (
		<div className="tab_title_wrap" style={{display: this.getTitleDisplayStyle(), height: this.state.titleHeight}}>
				{
						this.props.tabtitles.map((item, index)=> {
							return(
								<div key={index}
									onClick={() => { this.setSelectItem(index) } }
									className={ this.check_title_index( index ) }
									style={{
										width: this.titleWidth,
										display:'flex',
										flexDirection: 'column',
										justifyContent: justifyStyle
										}}>
									{render1(this.isheadertop ? item.title : index)}
									{render2(this.isheadertop ? index : item.title)}
								</div>
							)
						})
				}
				</div>
		)
	}

	renderContent = () => {
		return (
			<div className="tabcontent" style={{height: this.state.contentHeight}}>
				{
						React.Children.map(this.props.children, (element,index)=>{
								return (
									<TabItem key={index} tabindex={index} check_item_index={this.check_item_index}>
										{element}
									</TabItem>
								)
						})
				}
			</div>
		)
	}

	render(){
		const { children } = this.props;
		const render1 = this.isheadertop ? this.renderTitle : this.renderContent;
		const render2 = this.isheadertop ? this.renderContent : this.renderTitle;
		const justifyStyle = this.isheadertop ? 'flex-start' : 'flex-end';

		return(
			<div className="tabscontainer" style={
				{
					display:'flex',
					flexDirection: 'column',
					justifyContent: justifyStyle
				}
			}>
			{render1()}
			{render2()}
			</div>
		)
	}
}

class TabItem extends ZAComponent{
	constructor(props){
		super(props);
	}

	render(){
		const { children } = this.props;
		return (
			<div className={ this.props.check_item_index(this.props.tabindex) }>
				{children}
			</div>
		)
	}
}

export default TabControl;
