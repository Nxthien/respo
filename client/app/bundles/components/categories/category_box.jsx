import React from 'react';
import axios from 'react';
import * as app_constants from 'constants/app_constants';
import * as category_constants from './category_constants';
import FormQuestion from '../questions/form_question';
import QuestionShow from '../questions/question_show';

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
    const question_url = app_constants.APP_NAME + category_constants.CATEGORY_PATH
      + this.props.category.id + '/' + category_constants.QUESTION_PATH
    let list_questions = this.props.category.questions.map((question, index) => {
      return (
        <QuestionShow question={question} key={index} index={index}
          url={question_url + '/' + question.id}
          afterDeleteQuestion={this.afterDeleteQuestion.bind(this)}/>
      )
    })
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
                {list_questions}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterDeleteQuestion(_question) {
    _.remove(this.state.category.questions, function(question) {
      return question.id = _question
    });
    this.setState({
      category: this.state.category
    })
  }

  afterUpdateQuestion(new_question) {
    let index = this.state.category.questions
      .findIndex(question => question.id === new_question.id);
    this.state.category.questions[index] = new_question;
    this.setState({
      category: this.state.category
    });
  }

  afterCreateQuestion(question) {
    this.state.category.questions.push(question)
    this.setState({
      category: this.state.category
    })
  }
}
