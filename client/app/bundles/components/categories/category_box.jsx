import React from 'react';
import axios from 'react';
import * as app_constants from 'constants/app_constants';
import * as category_constands from './category_constants';
import FormQuestion from '../questions/form_question';
export default class CategoryBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.category,
      question: {
        content: '',
        answers: []
      }
    }
  }

  render() {
    return (
      <div className='row languages admin-languages'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{this.state.category.name}</h3>

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
              <div className='create-question'>
                <FormQuestion question={this.state.question}
                  category={this.state.category}
                  afterCreateQuestion={this.afterCreateQuestion.bind(this)}/>
              </div>
              <div className='list-question'>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterCreateQuestion(question) {
    this.state.category.questions.push(question)
    this.setState({
      category: this.state.category
    })
  }
}
