import Layout, { siteTitle } from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import { Card, Col, Row } from "react-bootstrap";
import { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <Row xs={1} md={2} className="g-4">
            {this.props.hotels.map(({ hotelId, name, images, description }) => (
              <Col lg={6} key={hotelId}>
                <Card>
                  <Card.Img variant="top" src={images[0]?.url} />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description.short}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Layout>
    );
  }
}

export async function getServerSideProps({ params }) {
  let url = "https://sandbox.impala.travel/v1/hotels";

  let options = {
    params,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.API_KEY,
    },
  };

  const { data } = await fetch(url, options).then((res) => res.json());

  return {
    props: {
      hotels: data,
    },
  };
}
