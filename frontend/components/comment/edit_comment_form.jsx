import React from 'react';
import { connect } from 'react-redux';
import { updateComment } from '../../actions/comment_actions';

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        body: this.props.comment.body,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body.length > 0) {
      const updatedComment = {
        id: this.props.comment.id,
        body: this.state.body,
      };
      this.props.updateComment(updatedComment);
      this.props.toggleModal(`EditComment-${this.props.comment.id}`);
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
            onChange={this.update('body')}
            value={this.state.body}/>
            <div
            className="comment-form-options">
            <button
              className={this.state.body ? ("green-submit-button") : ("disabled-save-button")}>
              Save</button>
            <img onClick={() => this.props.toggleModal(`EditComment-${this.props.comment.id}`)}
              src={window.closeIcon} />
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
    updateComment: comment => dispatch(updateComment(comment)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(EditCommentForm);
