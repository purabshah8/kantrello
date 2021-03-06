import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_actions';

class NewCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body.length > 0) {
      const newDescription = {
        body: this.state.body,
        card_id: this.props.card.id,
        user_id: this.props.currentUserId,
      };
      this.props.createComment(newDescription).then(
        () => this.setState({body: ''})
      );
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
        <form className="comment-form"
          onSubmit={this.handleSubmit}>

            <textarea className="comment-input"
              placeholder="Write a comment..."
              onChange={this.update('body')}
              value={this.state.body}/>
            <div className="comment-form-options">
              <button
                className={this.state.body ? ("green-submit-button") : ("disabled-save-button")}>
                Save
              </button>
              <span>This field supports markdown syntax</span>
            </div>
        </form>
    );
  }
}

const mapStatetoProps = state => {
  return {
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(NewCommentForm);
