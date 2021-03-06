import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './training_standard_constants';

const STANDARD_SUBECTS_URL = app_constants.APP_NAME + training_standard_constants.ADMIN_STANDARD_SUBECTS_PATH;

export default class SubjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    let {name} = this.props.subject
    return(
      <li className="list-group-item" 
        onClick={this.onClickSubjectItem.bind(this)}
        title={this.props.subject.name}>
        <input type="checkbox" value={this.props.subject.id}
          checked={this.state.checked} readOnly
          name={this.props.subject.name}>
        </input>
        {name}
      </li>
    );
  }

  onClickSubjectItem(event) {
    if(this.state.checked) {
      let index = this.state.select_subjects.findIndex(
        select_subject => select_subject.id == this.props.subject.id)
      this.state.select_subjects.splice(index, 1);
      this.props.chooseSubjectItem(this.state.select_subjects);
    }else {
      this.state.select_subjects.push(this.props.subject);
      this.props.chooseSubjectItem(this.state.select_subjects);
    }
  }
}
