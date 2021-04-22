import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { io } from "socket.io-client";
import { Status } from '../shared/status';
import { formatDateTime } from '../shared/utils';

export default class OrganizationDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            api: {},
            mqtt: {},
        };

        this.statuses = [{
            name: 'SensorThings API',
            stateKey: 'api',
            statusLabel: 'Reachable',
        }, {
            name: 'SensorThings MQTT',
            stateKey: 'mqtt',
            statusLabel: 'Reachable',
        }];
    }

    componentDidMount() {
        this.ws = io(`http://localhost:3000/organization/${this.props.orgData._id}`);

        this.ws.on('sensor-things-api', (data) => {
            this.setState({ api: data });
            console.log(`@@@ W/S response: ${JSON.stringify(data)}`);
        });

        this.ws.on('sensor-things-mqtt', (data) => {
            this.setState({ mqtt: data });
            console.log(`@@@ W/S response: ${JSON.stringify(data)}`);
        });
    }

    componentWillUnmount() {
        if (this?.ws !== undefined) {
            this.ws.close();
        }
    }

    render() {
        return (
            <Card>
                <Card.Header as="h3">{this.props.orgData.name}</Card.Header>
                <Card.Body>
                    <Card.Subtitle>{this.props.orgData.domainName}</Card.Subtitle>
                    <Table>
                        <tbody>
                            {
                                this.statuses.map((statusSpec) => {
                                    return (
                                        <tr key={statusSpec.name}>
                                            <td>{statusSpec.name}</td>
                                            <td>{this.state[statusSpec.stateKey]?.name ?? 'TBD'}</td>
                                            <td>
                                                <Status
                                                    label={statusSpec.statusLabel}
                                                    value={this.state[statusSpec.stateKey]?.status ?? false}
                                                    popover={{ label: 'Last checked:', value: formatDateTime(this.state[statusSpec.stateKey]?.date) }} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        );
    }
}