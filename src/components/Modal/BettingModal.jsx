import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as ModalActions from "../../store/actions/modals";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Amit kapunk a store-ból
const mapStateToProps = (state, match) => {
  return {
    bettingmodal: state.Modals.value,
    matchvalue: state.Modals.match
  };
};

// Amit beküldünk a store-ba (mapDispatchToProps)
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(ModalActions.BettingModalAction(false, {}))
  };
};

class BettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    /* this.setState(prevState => ({
      modal: !prevState.modal
    })); */
    this.props.closeModal()
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.bettingmodal}
          centered={true}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>{typeof this.props.matchvalue !== "undefined" ? this.props.matchvalue.betvalue:""}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BettingModal)
);
