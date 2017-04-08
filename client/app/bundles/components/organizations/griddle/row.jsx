import React from 'react';
import OrganizationPolicy from 'policy/organization_policy';

export default  class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : {default: obj}; }

  componentWillReceiveProps(nextProps){
    this.setState({
      refresh: true
    });
  }

  render() {
    var _react2 = this._interopRequireDefault(React);
    var Cell = this.props.Cell;
    var columnIds = this.props.columnIds;
    var style = this.props.style;
    var griddleKey = this.props.griddleKey;
    var className = this.props.className;
    var defaultRow = _react2.default.createElement(
      'tr',
      {
        key: griddleKey,
        style: style,
        className: className
      },
      columnIds && columnIds.map(function (c) {
        return _react2.default.createElement(Cell, {
          key: c + '-' + griddleKey,
          griddleKey: griddleKey,
          columnId: c,
          style: style,
          className: className
        });
      })
    );
    var record = this.organizations[this.props.griddleKey];
    var current_user = $.parseJSON(localStorage.current_user);
    var owner = record.creator_id == current_user.id;
    return(
      <OrganizationPolicy
        permit={[
          {action: ['index'], target: 'allChild'},
          {action: ['!index'], target: 'children'},
        ]}
        allChild={defaultRow}
      >
        {owner ? defaultRow : null}
      </OrganizationPolicy>
    )
  }
}