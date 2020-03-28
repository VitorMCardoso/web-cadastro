// Importando o React
import React, { Component } from 'react';
import Header from './components/header/header'
import Main from './main'
import { connect } from "react-redux";
import { fetchContact } from './actions'
import User from './model/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      job_role: null,
      about_me: null,
      expirience: null,
    };
  }

  componentDidMount() {
    this.props.fetchContact();
  }

  render() {
    const {
      name, job_role, about_me, expirience
    } = this.props.data;
    let user = new User(
      name,
      job_role,
      about_me,
      expirience
    )
    return (
      <div>
        <Header />
        <Main user={user}/>
      </div>
    );
  }
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
  data,
  isLoadingData
});
export default connect(
  mapStateToProps,
  {
    fetchContact,
  }
)(App);