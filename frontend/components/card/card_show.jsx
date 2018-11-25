import React from 'react';
import showdown from 'showdown';
import MoveCardForm from './move_card_form';
import EditCardDescriptionForm from './edit_card_description_form';
import NewCommentForm from '../comment/new_comment_form';

export default class CardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoveCardForm: false,
      showCardDescriptionForm: false,
    };
    this.closeCardShow = this.closeCardShow.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.toggleMoveCardForm = this.toggleMoveCardForm.bind(this);
    this.toggleEditCardDescription = this.toggleEditCardDescription.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);

  }

  componentDidUpdate() {
    if (!this.props.list) {
      this.props.fetchList(this.props.card.list_id);
    }
    if (!this.props.comments) {
      this.props.fetchComments();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction(e) {
    if(e.keyCode === 27 && !this.state.showCardDescriptionForm && !this.state.showMoveCardForm) {
      this.closeCardShow();
    }
  }

  closeCardShow() {
    this.props.closeModal();
    this.props.history.push(`/boards/${this.props.card.board_id}`);
  }

  toggleMoveCardForm() {
    this.setState({
      showMoveCardForm: !this.state.showMoveCardForm,
    });
  }

  toggleEditCardDescription() {
    this.setState({
      showCardDescriptionForm: !this.state.showCardDescriptionForm,
    });
  }

  changeIcon(icon) {
    return (e) => {
      e.currentTarget.children[0].src = icon;
    };
  }

  convertMarkdown(text) {
    const converter = new showdown.Converter({tables: true, strikethrough: true});
    return converter.makeHtml(text);
  }

  deleteCard() {
    const listId = this.props.card.list_id;
    this.closeCardShow();
    this.props.deleteCard().then(this.props.fetchList(listId));
  }

  deleteComment(commentId) {
    return e => this.props.deleteComment(commentId);
  }

  renderMoveCardForm() {
    if (!this.state.showMoveCardForm) return null;
    return (
      <MoveCardForm
        toggleMoveCardForm={this.toggleMoveCardForm}
        card={this.props.card} />
    );
  }

  renderEditDescription() {
    const fakeCard = { title: '', description: '' };
    const { title, description } = this.props.card || fakeCard;
    if (!this.state.showCardDescriptionForm) {
      const descriptionText = description ? this.convertMarkdown(description) : "No details";
      return(
        <div onClick={this.toggleEditCardDescription}
          dangerouslySetInnerHTML={{__html: descriptionText} }
          className="description">
        </div>
      );
    } else {
      return <EditCardDescriptionForm
        card={this.props.card}
        toggleEditCardDescription={this.toggleEditCardDescription} />;
    }
  }

  renderComments() {
    const commentsList = (this.props.comments) ? this.props.comments : [];
    const comments = commentsList.map(comment => {
      return (
        <li key={comment.id}>
          <h3>{comment.author}</h3>
          <div className="comment-body"
            dangerouslySetInnerHTML={{__html: this.convertMarkdown(comment.body)}}>
          </div>
          <div className="comment-options">
            <u>Edit</u> - <u onClick={this.deleteComment(comment.id)}>Delete</u>
          </div>
        </li>
      );
    });
    return (
      <div className="show-card-comments">
        <img className="comments-icon" src={window.commentsIcon} />
        <div className="comments-form-container">
          <h2>Add Comment</h2>
          <NewCommentForm card={this.props.card}/>
        </div>
        <div className="comments-header">
          <img className="activity-icon" src={window.activityIcon} />
          <h2>Activity</h2>
        </div>
        <div className="card-comments"></div>
        <ul className="comments">
          {comments}
        </ul>
      </div>
    );
  }

  render() {
    const fakeCard = { title: '', description: '' };
    const { title, description } = this.props.card || fakeCard;
    const listName = this.props.list ? this.props.list.title : "listName";
    return(
      <div onClick={this.closeCardShow}
        className="modal-background">
        <div className="card-container"
          onClick={e => e.stopPropagation()}>
          {this.renderMoveCardForm()}
          <div onClick={this.closeCardShow}
            onMouseOver={this.changeIcon(window.closeDarkIcon)}
            onMouseOut={this.changeIcon(window.closeIcon)}
            className="close-card-icon-overlay">
            <img className="close-card-icon"
              src={window.closeIcon} />
          </div>
          <div className="show-card-title">
            <img className="card-icon" src={window.cardIcon}/>
            <span>{title}</span>
            <p>in list <u>{listName}</u></p>
          </div>
          <div className="show-card-main">
            <div className="show-card-content">
              <div className="show-card-description">
                <img className="description-icon" src={window.descriptionIcon}/>
                <div className="description-header">
                  <h2>Description</h2>
                  <u onClick={this.toggleEditCardDescription}>Edit</u>
                </div>
                {this.renderEditDescription()}
              </div>
              {this.renderComments()}
            </div>
            <div className="show-card-sidebar">
              <h3>Actions</h3>
              <button onClick={this.toggleMoveCardForm}
                className="gray-button">
                <img src={window.arrowIcon} />
                <span>Move</span>
              </button>
              <button className="gray-button">
                <img src={window.cardIcon} />
                <span>Copy</span>
              </button>
              <button onClick={this.deleteCard}
                className="gray-button">
                <img src={window.trashIcon} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
