import React, { Component } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, actions as formActions, Control } from "react-redux-form";
import { Row, Button, FormGroup } from 'reactstrap';
import { visitors } from "../constants/models";
import bindActionCreatorHoc from '../libraries/bindActionCreatorHoc';
import { getLabel } from '../libraries/utils';

class IndexPage extends Component {

  handleSubmit = (time) => {
    this.props.resultAction.getNumberOfVisitors(time);
  }

  handleCompete = () => {
    this.props.resultAction.competePoker()
  }

  handleReset = () => {
    this.props.resultAction.resetPoker()
  }

  render() {

    const { 
      visitiorResult,
      pokerResult,
      cardsA,
      wordA,
      cardsB,
      wordB
    } = this.props;

    return (
      <div className="index-bg global-content">

        <div className="part-container">
          <h1>Maximum number of visitors</h1>

          <Form 
            model="forms.time"
            className="time-form-comp"
            onSubmit={time => this.handleSubmit(time)}
          >
              
            <FormGroup>
              <label>Start time</label>
              <div className="form-input">
                <Control.text
                  className="input-start"
                  model=".start"
                  placeholder="Start time"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <label>End time</label>
              <div className="form-input">
                <Control.text
                  className="input-end"
                  model=".end"
                  placeholder="End time"
                />
              </div>
            </FormGroup>

            <h4>Result: {visitiorResult}</h4>

            <button className="btn btn-success" type="submit">Get Maximum Vistors</button>
          </Form>

        </div>

        <div className="part-container">
          <h1>Poker</h1>

          <h4>Result: {pokerResult}</h4>
          <h5>A's card: {wordA}</h5>
          <ul>
          {
            cardsA.length > 0 ? 
              cardsA.map((d, i) => (
                <li key={i} className="card-li">
                  <img className="card-icon" src={getLabel(d).labelIcon} />
                  <span className="card-val">{getLabel(d).val}</span>
                </li>
              ))
              :
              null
          }
          </ul>
          <h5>B's card: {wordA}</h5>
          <ul>
          {
            cardsB.length > 0 ? 
              cardsB.map((d, i) => (
                <li key={i} className="card-li">
                  <img className="card-icon" src={getLabel(d).labelIcon} />
                  <span className="card-val">{getLabel(d).val}</span>
                </li>
              ))
              :
              null
          }
          </ul>

          <button className="btn btn-danger" onClick={this.handleReset} >Reset</button>
          <button className="btn btn-success" onClick={this.handleCompete} >Compete</button>
        </div>
      </div>
    );
  }
};



const mapStateToProps = ({ Result }) => ({
  pokerResult: Result.poker.result,
  cardsA: Result.poker.resultA.cards,
  wordA: Result.poker.resultA.word,
  cardsB: Result.poker.resultB.cards,
  wordB: Result.poker.resultB.word,
  visitiorResult: Result.vistors.result
});

export default compose(
  connect(mapStateToProps),
  bindActionCreatorHoc
)(IndexPage);
