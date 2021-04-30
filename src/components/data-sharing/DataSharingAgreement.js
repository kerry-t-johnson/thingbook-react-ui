import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class DataSharingAgreement extends React.Component {

    render() {
        const { agreement, image_type = undefined } = this.props;

        const imageURL = agreement.extraImageURLs[image_type] ?? agreement.imageURL;

        return (
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">{agreement.name}</Card.Title>
                    <Card.Text className="text-center">Produced by: {agreement.producer.name}</Card.Text>
                </Card.Body>
                <Link to={`/agreement/${agreement._id}`}>
                    <img
                        className="d-block"
                        style={{ 'objectFit': 'contain', 'maxHeight': '550px' }}
                        src={imageURL}
                        alt="Data flow diagram" />
                </Link>
            </Card>
        );
    }
}