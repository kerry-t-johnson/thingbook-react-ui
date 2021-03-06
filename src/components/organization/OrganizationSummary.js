import Card from 'react-bootstrap/Card';

function OrganizationSummary(props) {
    const { item } = props;

    const selfUrl = `/organization/${encodeURIComponent(item?.links?.self?.href)}`;

    return (
        <div className="col">
            <Card>
                <Card.Header as="h3"><a href={selfUrl}>{item.name}</a></Card.Header>
                <Card.Body>
                    <Card.Subtitle>{item.domainName}</Card.Subtitle>
                    <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        </div>
    );
}

export default OrganizationSummary;
