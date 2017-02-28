import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';
import * as dashboard_constands from './dashboard_constands';

const ADMIN_LANGUAGES_URL = app_constants.APP_NAME + dashboard_constands.ADMIN_LANGUAGES_PATH;
const ADMIN_ORGANIZATIONS_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_ORGANIZATIONS_PATH;
const ADMIN_STAGES_URL = app_constants.APP_NAME + dashboard_constands.ADMIN_STAGES_PATH;
const ADMIN_SUBJECTS_URL = app_constants.APP_NAME + dashboard_constands.ADMIN_SUBJECTS_PATH;
const ADMIN_TRAINEE_TYPES_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_TRAINEE_TYPES_PATH;
const ADMIN_TRAINING_STANDARDS_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_TRAINING_STANDARDS_PATH;
const ADMIN_UNIVERSITIES_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_UNIVERSITIES_PATH;


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem('page')) {
      localStorage.setItem('page', 'languages');
    }
  }

  render () {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu td-admin-sidebar'>
            <li className='active' data-page='languages'>
              <a href={ADMIN_LANGUAGES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-book'></i>
                <span>{I18n.t('sidebar.languages')}</span>
              </a>
            </li>

            <li data-page='organizations'>
              <a href={ADMIN_ORGANIZATIONS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-folder'></i>
                <span>{I18n.t('sidebar.organizations')}</span>
              </a>
            </li>

            <li data-page='stages'>
              <a href={ADMIN_STAGES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-dashboard'></i>
                <span>{I18n.t('sidebar.stages')}</span>
              </a>
            </li>

            <li data-page='subjects'>
              <a href={ADMIN_SUBJECTS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-files-o'></i>
                <span>{I18n.t('sidebar.subjects')}</span>
              </a>
            </li>

            <li data-page="trainee_types">
              <a href={ADMIN_TRAINEE_TYPES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-dashboard'></i>
                <span>{I18n.t('sidebar.trainee_types')}</span>
              </a>
            </li>

            <li data-page="training_standards">
              <a href={ADMIN_TRAINING_STANDARDS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-wpforms'></i>
                <span>{I18n.t('sidebar.training_standards')}</span>
              </a>
            </li>

            <li data-page="universities">
              <a href={ADMIN_UNIVERSITIES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-university'></i>
                <span>{I18n.t('sidebar.universities')}</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }

  onClick(event) {
    localStorage.setItem('page', $(event.target).closest('li').data('page'));
  }

  componentDidMount(){
    let page = localStorage.getItem('page');
    $('.td-admin-sidebar li.active').removeClass('active');
    if($('li[data-page="' + page + '"]')){
      $('li[data-page="' + page + '"]').addClass('active');
    }
  }
}
