import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      errors: [],
      organizations: [],
      organization: {
        name: ''
      }
    };
  }

  render() {
    if(this.state.parent) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className="form-group">
            <input type="text" placeholder={I18n.t("organizations.create_sub")}
              className="form-control" name="name" ref="nameField"
              onChange={this.handleChange.bind(this)}
               />
            <input type="text" className="form-control hidden disable"
              name="parent_id" defaultValue={this.props.parent.id} />
          </div>

          <div className="form-group">
            <div className="text-right">
              <button type="submit"
                className="btn btn-primary" disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className="form-group">
            <input type="text" placeholder={I18n.t("organizations.headers.name")}
              className="form-control" name="name" ref="nameField"
              onChange={this.handleChange.bind(this)} />
          </div>
          <div className="form-group">
            <div className="text-right">
              <button type="submit"
                className="btn btn-primary" disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </form>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parent: nextProps.parent
    });
  }

  formValid(){
    return this.state.organization.name != '';
  }

  handleChange(event) {
    this.setState({
      organization: {
        name: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url, {
      organization: {
        name: this.refs.nameField.value,
        parent_id: this.state.parent ? this.state.parent.id : ''
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        $('#modal').modal('hide');
        this.refs.nameField.value = '';
        this.props.handleAfterSaved(response.data.organization);
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
