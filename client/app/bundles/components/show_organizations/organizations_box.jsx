import React from 'react';
import axios from 'axios';

import FormCreate from './form_create';
import OrganizationLists from './organization_lists';
import BoxTitle from './box_title';

import * as app_constants from 'constants/app_constants';
import * as user_constants from '../users/user_constants';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH;

const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations';
require('../sass/show_organization.scss');

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: {},
      programs: [],
      parent: null,
      user: this.props.user
    }
  }

  componentWillMount(){
    this.fetchOrganization()
  }

  fetchOrganization() {
    if(this.props.organization){
      const url = ORGANIZATION_URL + '/' + this.props.organization.id
      axios.get(url + '.json')
      .then(response => {
        this.setState({
          organization: response.data.organization,
          programs: response.data.programs
        })
      })
    }
  }

  
  render() {
    let owner = this.state.organization.owner;
    let members = this.state.organization.users;
    let count_training_standards = 0;
    let count_courses = 0;
    for(let program of this.state.programs){
      count_training_standards += program.training_standards.length;
      count_courses +=program.courses.length;
    }
    let link_to_owner = '';
    let link_to_members = '';
    let remaining_members = '';
   
    if(owner) {
      link_to_owner = this.renderOwner(owner);
    }

    if(members) {
      let count_remaining_members = members.length - 2;
      link_to_members = this.renderMembers(members.slice(0,2));
      if(count_remaining_members > 0) {
        remaining_members = 
        (
          <div className='block-member'>
            <a className='image image-others'
              onClick={this.handleClick.bind(this)}
              title={I18n.t('organizations.all_members')} >
              <img src='/assets/profile.png' className='img-circle' />
              <span className='count-users'>{count_remaining_members}+</span>
            </a>
            <div id='modalMember' className='modal fade in' role='dialog'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button type='button' className='close'
                      data-dismiss='modal'>&times;</button>
                    <h4 className='modal-title'>
                      {I18n.t('organizations.all_managers')}
                    </h4>
                  </div>
                  <div className='modal-body'>
                    {this.renderMembers(members.slice(0, members.length))}
                  </div>
                  <div className='clearfix'></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className='row'>
        <div className='col-md-9'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <BoxTitle organization={this.state.organization} 
                handleAfter={this.handleAfter.bind(this)}
                programs={this.state.programs}/>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>
            <div className='box-body no-padding'>
              {this.renderBoxOrganization()}
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                <strong>{I18n.t('organizations.titles.info')}</strong>
              </h3>
            </div>
            <div className='box-body'>
              <div>
                <div className='member-title'>
                  <i className='fa fa-graduation-cap' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.num_programs')}
                  </strong>
                  <span className='badge label-primary'>
                    {this.state.programs.length}
                  </span>
                </div>
                <br />
                <div className='member-title'>
                  <i className='fa fa-certificate' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.num_training_standards')}
                  </strong>
                  <span className='badge label-primary'>
                    {count_training_standards}
                  </span>
                </div>
                <br />
                <div className='member-title'>
                  <i className='fa fa-book' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.num_courses')}
                  </strong>
                  <span className='badge label-primary'>
                    {count_courses}
                  </span>
                </div>
                <br/>
                <div className='member-title'>
                  <i className='fa fa-user-circle-o' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.owners')}
                  </strong>
                  <div className='block-trainer'>
                    {link_to_owner}
                  </div>
                </div>
                <br />
                <div className='member-title'>
                  <i className='fa fa-users' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.members')}
                  </strong>
                  <div className='block-trainer'>
                    {link_to_members}
                    {remaining_members}
                  </div>
                </div>
                <br />
                <ul className='user-list clearfix'>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderBoxOrganization(){
    if(this.props.organization){
      return(
        <div className='box-organization'>
          <div className='list-sub-organization'>
            <OrganizationLists organization={this.state.organization}
              handleAfter={this.handleAfter.bind(this)}
              programs={this.state.programs}/>
          </div>
        </div>
      )
    }else{
      return(
        <div className='box-organization'>
          <div className='form-create'>
            <FormCreate parent={this.state.parent} url={ORGANIZATION_URL}
              user_id={this.props.user} />
          </div>
        </div>
      )
    }
  }

  handleAfter(organization, programs) {
    this.setState({
      organization: organization,
      programs: programs
    });
  }

  checkImage(event){
    let target = event.target;
    $(target).attr('src', '/assets/image_found.png')
  }

  renderMembers(members) {
    return(
      members.map((member, index) => {
        return(
          <a key={index} className='image' onError={this.checkImage.bind(this)}
            title={member.name} href={USER_URL + member.id} >
            <img src={member.avatar.url} className='img-circle' />
          </a>
        ) 
      })
    )
  }

  handleClick() {
    let $target = $(event.target);
    $target.blur();
    $('#modalMember').modal();
  }

  renderOwner(owner) {
    return(
      <a className='image' 
        onError={this.checkImage.bind(this)}
        title={owner.name} 
        href={USER_URL + owner.id} >
        <img src={owner.avatar.url} className='img-circle' />
      </a>
    )
  }
}
