import Navbar from "../../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Head from "next/head";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Navbar />
      <div className="container mt-3">
        <h1 className="text-center">Contact us</h1>

        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="text" placeholder="Full name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>

        <Button variant="info" type="submit" onClick={() => router.reload()}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Contact;
