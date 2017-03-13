import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization,
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className="form-group">
          <input type="text" placeholder={I18n.t("organizations.edit")}
            className="form-control" name="name" ref="nameField"
            value={this.state.organization.name}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <div className="text-right">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    let organization = Object.assign({}, this.state.organization,
      {[attribute]: event.target.value});
    this.setState({
      organization: organization
    });
  }

  formValid() {
    return this.state.organization.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.patch(this.props.url + '/' + this.state.organization.id, {
      organization: {
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modal').modal('hide');
      this.props.handleAfterSaved(response.data.organization);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
