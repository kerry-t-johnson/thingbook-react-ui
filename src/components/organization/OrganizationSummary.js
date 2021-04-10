import Card from 'react-bootstrap/Card';

function OrganizationSummary(props) {
    const { org } = props;

    const selfUrl = `/organization/${encodeURIComponent(org?.links?.self?.href)}`;

    return (
        <div className="col">
            <Card>
                <Card.Header as="h3"><a href={selfUrl}>{org.name}</a></Card.Header>
                <Card.Body>
                    <Card.Subtitle>{org.domainName}</Card.Subtitle>
                    <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        </div>
    );
}

export default OrganizationSummary;
