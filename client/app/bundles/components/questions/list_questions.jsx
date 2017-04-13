import React from 'react';
import axios from 'axios';
import ModalQuestion from './templates/modal_question';
import QuestionShow from './templates/question_show';

export default class ListQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
      question: {
        id: '',
        content: '',
        answers: []
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions
    })
  }

  render() {
    let list_questions = this.state.questions.map((question, index) => {
      return (
        <QuestionShow question={question} key={index} index={index}
          url={this.props.url + '/' + question.id}
          afterDeleteQuestion={this.afterDeleteQuestion.bind(this)}
          afterClickEditQuestion={this.afterClickEditQuestion.bind(this)} />
      )
    });

    let modal_question = '';
    if (this.state.question.id != '') {
      modal_question = (
        <ModalQuestion
          question={this.state.question}
          afterUpdateQuestion={this.afterUpdateQuestion.bind(this)}
          url={this.props.url + '/' + this.state.question.id} />
      )
    }
    return (
      <div>
        {list_questions}
        {modal_question}
      </div>
    )
  }

  afterClickEditQuestion(question) {
    $('.modal-edit').modal();
    this.setState({
      question: question
    })
  }

  afterDeleteQuestion(question) {
    this.props.afterDeleteQuestion(question);
  }

  afterUpdateQuestion(question) {
    this.props.afterUpdateQuestion(question);
  }
}
