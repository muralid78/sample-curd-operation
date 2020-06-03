import React, { Component, Fragment } from "react";
import toastr from "toastr";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import { controllers } from "chart.js";
class Tables extends React.Component {
  constructor(props) {
    super(props);

    toastr.options = {
      positionClass: "toast-top-right",
      hideDuration: 300,
      timeOut: 6000,
    };
    this.state = {
      buyItems: [
        {
          id: 1,
          email: "one@one",
          name: "Matthew",
          city: "Tuscaloosa",
          contact: "+1 123-456-789",
        },
        {
          id: 2,
          email: "two@two",
          name: "Alexander",
          city: "Huntsville",
          contact: "+1 123-456-789",
        },
      ],
      submitted: false,
    };
    this.updateDetails = this.updateDetails.bind(this);
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  addItem(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { buyItems } = this.state;
    const { name, city, email, contact, id } = this.state;
    if (name && city && email && contact) {
      const maxValueOfY = Math.max(...this.state.buyItems.map((o) => o.id), 0);
      this.setState({
        buyItems: [
          ...this.state.buyItems,
          {
            name: name,
            city: city,
            email: email,
            contact: contact,
            id: maxValueOfY + 1,
          },
        ],
      });
      setTimeout(() => toastr.info("Details added"), 300);
      this.setState({
        name: "",
        city: "",
        email: "",
        contact: "",
        id: "",
      });
      this.setState({ submitted: false });
    }
  }

  updateDetails(item) {
    this.setState(item);
  }

  editDetails(item) {
    this.setState({ submitted: true });
    const { buyItems } = this.state;
    const { name, city, email, contact, id } = this.state;
    if (name && city && email && contact) {
      var index = this.state.buyItems.findIndex((x) => x.id === id);
      debugger;
      this.setState({
        buyItems: [
          ...this.state.buyItems.slice(0, index),
          Object.assign({}, this.state.buyItems[index], {
            name: name,
            city: city,
            email: email,
            contact: contact,
            id: id,
          }),
          ...this.state.buyItems.slice(index + 1),
        ],
      });

      setTimeout(() => toastr.warning("Details updated"), 300);
      this.setState({
        name: "",
        city: "",
        email: "",
        contact: "",
        id: "",
      });
      this.setState({ submitted: false });
    }
  }

  clearDetails() {
    this.setState({
      name: "",
      city: "",
      email: "",
      contact: "",
      id: "",
    });
    this.setState({ submitted: false });
  }

  deleteDetails(itemDel) {
    this.setState({
      buyItems: this.state.buyItems.filter((item) => item.id !== itemDel.id),
    });
    setTimeout(() => toastr.info("Item Deleted"), 300);
  }

  render() {
    const { buyItems, submitted } = this.state;
    const { name, city, email, contact } = this.state;
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      this.addItem(e);
                    }}
                  >
                    <Row>
                      <Col md="12">
                        <Card className="card-user">
                          <CardHeader>
                            <CardTitle tag="h5">Add Details</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <Form id="do-to-form">
                              
                              <Row className="card-body">
                                <Col  md="6">
                                  <div
                                    className={
                                      // "col-sm-6 form-group" +
                                      submitted && !name ? " has-error" : ""
                                    }
                                  >
                                    <label htmlFor="name">Name</label>
                                    <Input
                                      value={this.state.name}
                                      className="form-control"
                                      id="username"
                                      onChange={this.handleChange("name")}
                                      type="text"
                                    ></Input>
                                    {submitted && !name && (
                                      <div className="help-block">
                                        Name is required
                                      </div>
                                    )}
                                  </div>
                                </Col>
                                <Col  md="6">
                                  <div
                                    className={
                                      //"col-sm-6 form-group" +
                                      submitted && !city ? " has-error" : ""
                                    }
                                  >
                                    <label htmlFor="city">City</label>
                                    <Input
                                      value={this.state.city}
                                      className="form-control"
                                      id="city"
                                      onChange={this.handleChange("city")}
                                      type="text"
                                    ></Input>
                                    {submitted && !city && (
                                      <div className="help-block">
                                        City is required
                                      </div>
                                    )}
                                  </div>
                                </Col>

                                <Col  md="6" className="toppadd">
                                  <FormGroup
                                    className={
                                      // "col-sm-6 form-group" +
                                      submitted && !email ? " has-error" : ""
                                    }
                                  >
                                    <label htmlFor="email">Email</label>
                                    <Input
                                      value={this.state.email}
                                      className="form-control"
                                      id="email"
                                      onChange={this.handleChange("email")}
                                      type="email"
                                    ></Input>
                                    {submitted && !email && (
                                      <div className="help-block">
                                        Email is required
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col md="6" className="toppadd">
                                  <FormGroup
                                    className={
                                      // "col-sm-6 form-group" +
                                      submitted && !contact ? " has-error" : ""
                                    }
                                  >
                                    <label htmlFor="contact">Contact</label>
                                    <Input
                                      value={this.state.contact}
                                      className="form-control"
                                      id="contact"
                                      onChange={this.handleChange("contact")}
                                    ></Input>
                                    {submitted && !contact && (
                                      <div className="help-block">
                                        Contact Number is required
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col className="padright" md="12">
                                  <div
                                    className="update ml-auto mr-auto"
                                    align="right"
                                  >
                                    {!this.state.id && (
                                      <Button
                                        className="btn-round"
                                        color="primary"
                                        type="submit"
                                      >
                                        Add
                                      </Button>
                                    )}
                                    {this.state.id && (
                                      <Button
                                        className="btn-round"
                                        color="primary"
                                        type="button"
                                        onClick={(e) => this.editDetails()}
                                      >
                                        Update
                                      </Button>
                                    )}
                                    <Button
                                      className="btn-round"
                                      color="danger"
                                      type="button"
                                      onClick={(e) => this.clearDetails()}
                                    >
                                      Clear
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    {/* <Button type="submit">Add</Button> */}
                  </Form>
                  <CardHeader>
                    <CardTitle tag="h5">View / Edit Details</CardTitle>
                  </CardHeader>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Contact </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyItems.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.contact}</td>
                            <td>
                              <Button
                                onClick={(e) => this.updateDetails(item)}
                                color="default btn-default2"
                              >
                                <i className="nc-icon nc-settings-gear-65" />
                              </Button>
                              &nbsp;
                              <Button
                                onClick={(e) => this.deleteDetails(item)}
                                color="danger btn-danger2"
                              >
                                <i className="nc-icon nc-simple-remove" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Tables;
