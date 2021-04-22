import Card from 'react-bootstrap/Card';
import Component from '../shared/component';
import { fetchJson } from '../shared/utils';

export default class Datastream extends Component {

    componentDidMount() {
        fetchJson(this.onResponse.bind(this), this.selfLink);
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