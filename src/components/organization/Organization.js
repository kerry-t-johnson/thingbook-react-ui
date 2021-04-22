import { Col, Row } from 'react-bootstrap';
import Component from '../shared/component';
import { fetchJson } from '../shared/utils';
import OrganizationAgreements from './OrganizationAgreements';
import OrganizationDetails from './OrganizationDetails';

export default class Organization extends Component {

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
            <div>
                <Row>
                    <Col>
                        <OrganizationDetails orgData={self} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Data Sharing Agreements</h5>
                        <OrganizationAgreements orgId={self._id} selfLink={self?.links?.agreement?.href} />
                    </Col>
                </Row>
            </div>
        );
    }

}