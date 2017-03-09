import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

export default class TreeNode extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      organization: this.props.organization,
      visible: true,
      index: null,
      name: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      index: nextProps.index,
      name: name
    });
  }

  toggle = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    let sub_organization;
    let show = this.state.visible ? 'fa fa-plus':'fa fa-minus';
    let parent = this.props.parent ? 'parent list-group-item': 'parent list-group-item info'
    let number_sub;
    if(this.state.organization.sub_organizations != null){
      sub_organization = this.state.organization.sub_organizations.map((organization) => {
        number_sub = this.state.organization.sub_organizations.length;
        let child = organization.sub_organizations.length > 0 ? 'parent-children':'children';
        return(
          <div className={child} key={'organization' + organization.id}>
              <TreeNode 
                organization={organization} 
                handleafterClickEdit={this.afterClickEditChildren.bind(this)} 
                handleafterClickCreate={this.afterClickCreateChildren.bind(this)}
                parent={true}/>
          </div>
        )
      });
    }else{
      show = "fa fa-minus";
      number_sub = 0;
    }
    return(
      <div className="list-organization list-group">
        <div className={parent}>
          <div className="organization-info col-xs-6">
            <div className="show inline">
              <i className={show} onClick={this.slideToggle.bind(this)}/>
            </div>
            <div className="name-organization inline">
              <div>
                Name: {this.state.organization.name}
              </div>
            </div>
          </div>
          <div className="function col-xs-6">
            <div className="fl-right">
              <div className="list-function none">
                <i className="edit fa fa-pencil" onClick={this.handleEdit.bind(this)} 
                  data-index={this.state.organization.id} 
                  data-name={this.state.organization.name}>
                </i>
                <i className="create fa fa-plus"
                  onClick={this.handleCreate.bind(this)}
                  data-index={this.state.organization.id}>
                </i>
              </div>
              <div className="list-icon">
                <i className="fa fa-bars" onClick={this.slideListFunction.bind(this)}/>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="number-suborganization">
          {number_sub} Sub organization
        </div>
        <div className="list-children list-group">
          {sub_organization}
        </div>
      </div>
    )
  }

  afterClickEditChildren(index, name){
    this.props.handleafterClickEdit(index, name)
  }

  afterClickCreateChildren(index){
    this.props.handleafterClickCreate(index)
  }

  slideListFunction(event){
    let target = event.target;
    $(target).blur();
    let listchildren = $(target).parent().siblings('.list-children');
    
    if(listchildren.hasClass('none')){
      listchildren.removeClass('none');
    }else{
      listchildren.addClass('none');
    }
  }

  slideToggle(event){
    let target = event.target;
    $(target).blur();
    
    let childPanel = $(target).closest('.parent').siblings();
    if($(childPanel).hasClass('hidden')){
      $(childPanel).removeClass('hidden');
    }else{
      $(childPanel).addClass('hidden');
    }

    let number_sub = $(target).parent().siblings('.number-suborganization');
    if(number_sub.hasClass('hidden')){
      $(number_sub).removeClass('hidden');
    }else{
      $(number_sub).addClass('hidden');
    }
    this.toggle();
  }

  handleEdit(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    let name = $(target).attr('data-name');
    this.props.handleafterClickEdit(index, name);
  }

  handleCreate(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    this.props.handleafterClickCreate(index);
  }
}