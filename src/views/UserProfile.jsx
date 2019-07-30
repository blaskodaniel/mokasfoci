import React, { useState, useContext, useRef } from "react";
import Notify from "react-notification-alert";
import { loadProfile, saveProfile } from "../_service/data";
import { AuthenticationContext } from "../context/AuthenticationContext";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

const UserProfile = () => {
  const notify = useRef({});
  const currentUser = useContext(AuthenticationContext);
  const [profildata, setProfildata] = useState({});

  useState(() => {
    const loadUserProfile = async () => {
      const resultPromise = await loadProfile(currentUser.user.sub);
      console.log(resultPromise.data);
      setProfildata(resultPromise.data);
    };
    loadUserProfile();
  }, []);

  const openNotify = (msg,type) => {
    const option = {
      place: "tc",
      message: msg,
      type: type,
      autoDismiss: 3
    }
    notify.current.notificationAlert(option);
  }

  const handleProfilSubmit = async e => {
    e.preventDefault();
    console.log(profildata);
    try {
      const saveresult = await saveProfile(profildata);
      if (saveresult) {
        openNotify("Mentés sikeres!","success");
      }
    } catch (e) {
      console.log("Hiba történt a profil mentése során", e);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfildata({ ...profildata, [name]: value });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/default-avatar.png")}
                    />
                    <h5 className="title">
                      {profildata.name ? profildata.name : profildata.username}
                    </h5>
                  </a>
                  <p className="description">
                    {parseInt(profildata.score, 10)} pont
                  </p>
                </div>
                <div className="card-description" />
              </CardBody>
              <CardFooter>
                {/* <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Form onSubmit={handleProfilSubmit}>
              <Card>
                <CardHeader>
                  <h5 className="title">Profilom</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Nevem</label>
                        <Input
                          defaultValue={profildata.name}
                          onChange={handleInputChange}
                          name="name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Nick nevem</label>
                        <Input
                          defaultValue={profildata.username}
                          onChange={handleInputChange}
                          name="username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email címem</label>
                        <Input
                          defaultValue={profildata.email}
                          onChange={handleInputChange}
                          name="email"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Azonosítóm</label>
                        <Input
                          disabled
                          defaultValue={profildata._id}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Kedvenc csapatom</label>
                        <select className="form-control" defaultValue="hu">
                          <option value="hu">Magyarország</option>
                          <option value="br">Brazília</option>
                          <option value="d">Németország</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Mentés
                  </Button>
                </CardFooter>
              </Card>
            </Form>
            <Card>
              <CardHeader>
                <h5 className="title">Visszajelzés</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Észrevétel, hiba</label>
                        <Input
                          cols="80"
                          placeholder="írd meg észrevételeidet..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Küldés
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      <Notify ref={notify} />
    </>
  );
};

export default UserProfile;
