import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        latitude: "",
        longitude: "",
        radius: 25000,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    console.log("Form was submitted: ", this.state.formData);
    event.preventDefault();
  }

  render() {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Here you can search for hotels:</p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Latitude (e.g. ):</Form.Label>
              <Form.Control
                name="latitude"
                type="text"
                placeholder="58.386186"
                value={this.state.formData.latitude}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Longitude (e.g. -9.952549):</Form.Label>
              <Form.Control
                name="longitude"
                type="text"
                placeholder="-9.952549"
                value={this.state.formData.longitude}
                onChange={this.handleChange}
              />

              <Form.Label>
                Radius (in meters): {this.state.formData.radius}
              </Form.Label>
              <Form.Range
                name="radius"
                placeholder="Enter radius"
                value={this.state.formData.radius}
                min="1"
                max="100000"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </section>
      </Layout>
    );
  }
}
