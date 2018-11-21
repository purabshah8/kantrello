import React from 'react';
import CardIndexItem from './card_index_item';
import NewCardForm from './new_card_form';

export default class CardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNewCard: false };
    this.toggleNewCard = this.toggleNewCard.bind(this);
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  toggleNewCard() {
    this.setState({ showNewCard: !this.state.showNewCard });
  }

  renderNewCardForm(addCardText) {
    if (!this.state.showNewCard) {
      return (
        <div className="new-card-container">
          <div onClick={this.toggleNewCard}
            className="new-card">
            <img src={window.plusIcon} />
            <span>{addCardText}</span>
          </div>
        </div>
      );
    }
    return (
      <NewCardForm
        createCard={this.props.createCard}
        toggleNewCard={this.toggleNewCard}
        listId={this.props.list.id}/>
  );

  }

  renderCards() {
    if (!this.props.cards) return null;
    const cardIndexItems = this.props.cards.map(card => {
      return(
        <CardIndexItem key={card.id}
          history={this.props.history}
          card={card}
          list={this.props.list} />
      );
    });
    return cardIndexItems;
  }

  render() {
    const Cards = this.renderCards();
    const addCardText = (Cards.length !== 0) ? "Add another card":"Add a card";
    return(
      <div className="list-cards-container">
        <ul className="list-cards">
          {Cards}
        </ul>
        {this.renderNewCardForm(addCardText)}
      </div>
    );
  }
}
