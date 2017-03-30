import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import * as app_constants from '../../../../constants/app_constants';
import * as subject_constants from '../subject_constants';

export default class FormTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: ''
      },
      type: props.type,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        <div className="form-group">
          <div className="col-md-12">
            <input type="text" placeholder={I18n.t("subjects.headers.name")}
              className="form-control" name="name" ref="nameField"
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <input type="text" placeholder={I18n.t("subjects.headers.content")}
              className="form-control" name="content" ref="contentField"
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-3 col-md-offset-9">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("buttons.create_task")}</button>
          </div>
        </div>
      </form>
    )
  }
  formValid() {
    return this.state.task.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      task: {
        [attribute]: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let ownerable_name
    if (this.props.user) {
      ownerable_name = 'CourseSubject';
    } else {
      ownerable_name = 'Subject';
    }
    axios.post(this.props.url, {
      task: {
        name: this.refs.nameField.value,
        content: this.refs.contentField.value,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: ownerable_name,
        type: this.props.type
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        this.refs.contentField.value = '';
        this.props.afterCreateTask(response.data.target,
          this.props.type, ownerable_name);
      })
      .catch(error => console.log(error));
  }
}
