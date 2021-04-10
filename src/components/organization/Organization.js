import Card from 'react-bootstrap/Card';
import React from "react";

export default class Organization extends React.Component {

    componentDidMount() {
        const selfLink = decodeURIComponent(this.props?.match?.params?.selfLink ?? this.props.selfLink);

        fetch(selfLink)
            .then(response => response.json())
            .then(this.onResponse.bind(this));
    }

    onResponse(data) {
        this.setState({ self: data })
    }

    render() {
        const { self } = this.state ?? {};

        if (self === undefined) {
            return (
                <div className="col">Loading...</div>
            );
        }

        return (
            <div className="col">
                <Card>
                    <Card.Header as="h3">{self.name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>{self.domainName}</Card.Subtitle>
                        <Card.Text></Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
            </div>
        );
    }

}