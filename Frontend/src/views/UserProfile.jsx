import React, { Component } from "react";
import { Grid, Row, Col, FormGroup } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DirectExchangeService from "../services/DirectExchangeService";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      userName: localStorage.getItem("userId"),
      nickName: localStorage.getItem("nickName"),
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      alert("Please log in");
    }
  }
  updateNickName = (e) => {
    e.preventDefault();
    let user = {
      userName: localStorage.getItem("userId"),
      nickName: this.state.nickName,
      rating: "N/A",
    };
    console.log("Updated Nick Name : " + JSON.stringify(user));

    DirectExchangeService.updateNickName(user).then((res) => {
      this.showAlert("Nick Name Updated");
      //this.props.history.push('/admin/bankaccount');
      localStorage.setItem("nickName", this.state.nickName);
      window.location.reload(false);
    });
  };

  cancel(e) {
    e.preventDefault();
    this.showAlert("Canceled");
    window.location.reload(false);
  }

  showAlert(msg) {
    alert(msg);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-5"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "User Name",
                          value: localStorage.getItem("userId"),
                        },
                        {
                          label: "Nickname",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nick Name",
                          value: this.state.nickName,
                          onChange: (e) =>
                            this.setState({ nickName: e.target.value }),
                        },
                      ]}
                    />
                    <div className="btn-toolbar">
                      <Button
                        bsStyle="info"
                        fill
                        type="submit"
                        onClick={this.updateNickName}
                      >
                        Update Details
                      </Button>
                      <Button
                        bsStyle="danger"
                        fill
                        type="submit"
                        onClick={this.cancel.bind(this)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
