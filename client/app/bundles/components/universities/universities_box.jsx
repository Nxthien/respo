import React from 'react';
import axios from 'axios';

import UniversityLists from './university_lists';
import Form from './form';

import * as app_constants from 'constants/app_constants';
import * as university_constants from './university_constants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.UNIVERSITY_PATH;

export default class UniversityBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: props.universities,
      university: {}
    };
  }

  render() {
    return (
      <div className='row universities'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('universities.titles.all')}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                  <Form
                    university={this.state.university}
                    url={UNIVERSITY_URL}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <UniversityLists universities={this.state.universities}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(university) {
    this.state.universities.push(university);
    this.setState({
      universities: this.state.universities,
      university: {}
    });
  }

  handleAfterUpdated(new_university) {
    let index = this.state.universities
      .findIndex(university => university.id === new_university.id);
    this.state.universities[index] = new_university;
    this.setState({
      universities: this.state.universities,
      university: {}
    });
  }

  handleAfterDeleted(deleted_university) {
    _.remove(this.state.universities,
      university => university.id === deleted_university.id);
    this.setState({universities: this.state.universities});
  }
}
