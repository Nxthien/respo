import React from 'react';
import axios from 'axios';
import AnswerShow from './answer_show'
import Destroy from '../actions/destroy'

export default class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      question:  nextProps.question
    })
  }

  render() {
    let list_answers = this.state.question.answers.map((answer, index) => {
      return (
        <AnswerShow answer={answer} key={index} />
      )
    });
    return (
      <div className='block-question'>
        <div className='block-content'>
          <div className='question show-question'>
            <div className='side-left'>
              <div className='number'>
                {this.props.index + 1}
              </div>
              <div className='delete-question'>
                <Destroy afterDeleteQuestion={this.afterDeleteQuestion.bind(this)}
                url={this.props.url} question={this.props.question} />
              </div>
              <div className='edit-question'>
                <a onClick={this.afterClickEditQuestion.bind(this)}
                  data-index={this.props.question.id}>
                  <i className="fa fa-pencil"></i>
                </a>
              </div>
            </div>
            <div className='side-right'>
              <div className='form-group'>
                <div className='form-input-question question-content
                  col-xs-offset-2'>
                  {this.state.question.content}
                </div>
              </div>
              <div className='clearfix'></div>
              <div className='form-answers'>
                {list_answers}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterClickEditQuestion() {
    this.props.afterClickEditQuestion(this.state.question);
  }

  afterDeleteQuestion(event) {
    this.setState({
      question: {
        content: '',
        answers: []
      }
    });
    this.props.afterDeleteQuestion(this.props.question);
  }
}
