import React from 'react';
import FormCourse from './form_course';

require('../sass/program_show.scss');

export default class Modal extends React.Component {
  render() {
    return (
      <div id='modalEdit' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('courses.modals.header_edit')}
              </h4>
            </div>
            <div className='modal-body'>
              <FormCourse program_detail={this.props.program_detail}
               url={this.props.url} program={this.props.program}
               url_programs={this.props.url_programs}
               course={this.props.course}
               all_roles={this.props.all_roles}
               owners={this.props.owners} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
