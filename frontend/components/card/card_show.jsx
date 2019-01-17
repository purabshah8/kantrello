import React from 'react';
import showdown from 'showdown';
import RenameCardForm from './rename_card_form';
import MoveCardForm from './move_card_form';
import CopyCardForm from './copy_card_form';
import EditCardDescriptionForm from './edit_card_description_form';
import NewCommentForm from '../comment/new_comment_form';
import EditCommentForm from '../comment/edit_comment_form';
import DateTimePicker from './date_time_picker';

export default class CardShow extends React.Component {
  constructor(props) {
    super(props);
    this.closeCardShow = this.closeCardShow.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderDateTimePicker = this.renderDateTimePicker.bind(this);
  }

  toggleModal(modal) {
    if (!this.props.modals) return;
    if (this.props.modals.includes(modal)) {
      this.props.closeModal(modal);
    } else
    this.props.openModal(modal);
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
    this.props.fetchList(this.props.card.list_id);
  }

  escFunction(e) {
    const possibleModals = [`MoveCard-${this.props.card.id}`, 'EditCardDescription', `CopyCard-${this.props.card.id}`, 'DateTimePicker' ];
    const otherModalsDisplayed = possibleModals.some((modal) => this.props.modals.indexOf(modal) !== -1);
    if(e.keyCode === 27 && !otherModalsDisplayed) {
      this.closeCardShow();
    }
  }

  closeCardShow() {
    this.props.history.push(`/boards/${this.props.card.board_id}`);
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

  renderDateTimePicker() {
    const { card, modals, updateCard } = this.props;
    if (!modals || !modals.includes("DateTimePicker"))
      return null;
    else return (
      <DateTimePicker card={card}
        toggleModal={this.toggleModal}
        updateCard={updateCard} />
    );
  }

  renderRenameCardForm() {
    const { card, modals } = this.props;
    if (!card) return null;
    if (!modals || !modals.includes(`RenameCard-${card.id}`)) {
      return(
        <div onClick={() => this.toggleModal(`RenameCard-${card.id}`)}
          className="card-title-div">
          <span>
            {card.title}
          </span>
        </div>
      );
    } else return(
      <div className="card-title-div">
        <RenameCardForm
          toggleModal={this.toggleModal}
          card={card} />
      </div>
    );
  }

  renderMoveCardForm() {
    const { card, modals } = this.props;
    if (!modals || !card || !modals.includes(`MoveCard-${card.id}`))
      return null;
    return (
      <MoveCardForm
        toggleModal={this.toggleModal}
        card={card} />
    );
  }

  renderCopyCardForm() {
    const { card, modals, list } = this.props;
    if (!modals || !card || !modals.includes(`CopyCard-${card.id}`))
      return null;
    return (
      <CopyCardForm
        toggleModal={this.toggleModal}
        card={card}
        list={list} />
    );
  }

  renderDueDate() {
    if (this.props.card && this.props.card.due_date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dueDate = new Date(this.props.card.due_date);
      const now = new Date();
      const diff = dueDate - now;
      let postStr = "";
      let classNames = "due-date-span ";
      if (diff < 0 && diff >= -86400000) {
        classNames += "card-recently-past-due";
        postStr = "(recently past due)";
      } else if (diff < -86400000) {
        classNames += "card-past-due";
        postStr = "(past due)"
      } else if (diff >= 0 && diff < 86400000) {
        classNames += "card-due-soon";
        postStr = "(due soon)";
      }
      return (
        <div className="card-due-date">
          <h3>Due Date</h3>
          <span className={classNames} onClick={this.renderDateTimePicker}>
            {`${months[dueDate.getMonth()]} ${dueDate.getDate()} at ${this.getTime(this.props.card.due_date)} ${postStr}`}
          </span>
        </div>
      );
    } else
      return null;
  }

  getTime(iso8601Date) {
    if (!iso8601Date)
      return '12:00 PM';
    let date = new Date(iso8601Date);
    let postfix = 'AM';
    let hour = date.getHours();
    if (hour > 12) {
      hour -= 12;
      postfix = 'PM';
    }
    if (hour === 12)
      postfix = 'PM';
    let minutes = date.getMinutes().toString().padStart(2,'0');
    let time = `${hour}:${minutes} ${postfix}`;
    return time;
  }

  renderEditDescription() {
    const fakeCard = { title: '', description: '' };
    const { title, description } = this.props.card || fakeCard;
    if (!this.props.modals || !this.props.modals.includes('EditCardDescription')) {
      if (description) {
        return(
          <div onClick={() => this.toggleModal('EditCardDescription')}
            dangerouslySetInnerHTML={{__html: this.convertMarkdown(description)} }
            className="description markdown">
          </div>
        );
      } else {
        return (
          <div onClick={() => this.toggleModal('EditCardDescription')}
          className="description no-description">
            Add a more detailed description...
          </div>
        );
      }
    } else {
      return <EditCardDescriptionForm
        card={this.props.card}
        toggleModal={this.toggleModal}
        toggleEditCardDescription={this.toggleEditCardDescription} />;
    }
  }

  renderComments() {
    const commentsList = (this.props.comments) ? this.props.comments : [];
    const comments = commentsList.map(comment => {
      const commentOptions = comment.user_id === this.props.userId ? 
      (
        <div className="comment-options">
          <u onClick={() => this.toggleModal(`EditComment-${comment.id}`)}>Edit</u> - <u onClick={this.deleteComment(comment.id)}>Delete</u>
        </div>
        ) : null;
      if (!this.props.modals || !this.props.modals.includes(`EditComment-${comment.id}`)) {
      return (
        <li key={comment.id}>
          <h3>{comment.author}</h3>
          <div className="comment-body">
            <div className="markdown"
              dangerouslySetInnerHTML={{__html: this.convertMarkdown(comment.body)}}>
            </div>
          </div>
          {commentOptions}
        </li>
      );} else {
        return (
          <li key={comment.id}>
            <h3>{comment.author}</h3>
            <EditCommentForm
            toggleModal={this.toggleModal}
            comment={comment}
            />
          </li>
        );
      }
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
    const { description } = this.props.card || fakeCard;
    const { card, list } = this.props;
    const listName = list ? list.title : "listName";
    const editDescriptionLink = description ? <u onClick={() => this.toggleModal('EditCardDescription')}>Edit</u> : null;
    return(
      <div onClick={this.closeCardShow}
        className="modal-background">
        <div className="card-container"
          onClick={e => e.stopPropagation()}>
          {this.renderMoveCardForm()}
          {this.renderCopyCardForm()}
          {this.renderDateTimePicker()}
          <div onClick={this.closeCardShow}
            onMouseOver={this.changeIcon(window.closeDarkIcon)}
            onMouseOut={this.changeIcon(window.closeIcon)}
            className="close-card-icon-overlay">
            <img className="close-card-icon"
              src={window.closeIcon} />
          </div>
          <div className="show-card-title">
            <img className="card-icon" src={window.cardIcon}/>
            {this.renderRenameCardForm()}
            <p>in list <u onClick={() => this.toggleModal(`MoveCard-${card.id}`)}>{listName}</u></p>
            {this.renderDueDate()}
          </div>
          <div className="show-card-main">
            <div className="show-card-content">
              <div className="show-card-description">
                <img className="description-icon" src={window.descriptionIcon}/>
                <div className="description-header">
                  <h2>Description</h2>
                  {editDescriptionLink}
                </div>
                {this.renderEditDescription()}
              </div>
              {this.renderComments()}
            </div>
            <div className="show-card-sidebar">
              <h3>Add to Card</h3>
              <button onClick={() => this.toggleModal("DateTimePicker")}
                className="gray-button">
                <img src={window.dueDateIcon} />
                <span>Due Date</span>
              </button>
              <h3>Actions</h3>
              <button onClick={() => this.toggleModal(`MoveCard-${card.id}`)}
                className="gray-button">
                <img src={window.arrowIcon} />
                <span>Move</span>
              </button>
              <button onClick={() => this.toggleModal(`CopyCard-${card.id}`)}
              className="gray-button">
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
