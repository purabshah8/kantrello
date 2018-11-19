import React from 'react';
import { connect } from 'react-redux';
import { updateList } from '../../actions/list_actions';

class RenameListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.list.title };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }


  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleRenameList();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title.length > 0) {
      const updatedList = {
        id: this.props.list.id,
        title: this.state.title,
      };
      this.props.updateList(updatedList);
      this.props.toggleRenameList();
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <form className="rename-list-form"
        onSubmit={this.handleSubmit}>
        <input
          onChange={this.update('title')}
          value={this.state.title}/>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateList: list => dispatch(updateList(list)),
  };
};

export default connect(null, mapDispatchToProps)(RenameListForm);
