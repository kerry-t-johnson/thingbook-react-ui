import React from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import * as io from 'socket.io-client';
import { apiEndpoint, fetchJson, formatDateTime } from "../shared/utils";
import DataSharingAgreement from "./DataSharingAgreement";

export default class DataSharingAgreementPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agreement: undefined,
            observations: [],
            image_type: undefined,
            metrics: [],
        };
    }

    componentDidMount() {
        fetchJson(this.onAgreementReceived.bind(this), `/api/v1/data-sharing/agreement/${this.props.id}`);

        this.ws = io(apiEndpoint(`/data-sharing-agreement/${this.props.id}`));

        this.ws.on('sensor-things-observation', (observation) => {
            console.log(`@@ W/S Observation: ${JSON.stringify(observation)}`);

            this.setState((state, props) => {
                const newObservations = [observation, ...state.observations];
                while (newObservations.length > (this.props.maxLength ?? 10)) {
                    newObservations.pop();
                }

                return {
                    observations: newObservations,
                    image_type: 'publish',
                }
            });

            setTimeout(() => {
                this.setState((state, props) => {
                    return { image_type: undefined };
                })
            }, 2500);
        });

        this.ws.on('data-stream-metrics', (metrics) => {
            console.log(`@@ W/S Metrics: ${JSON.stringify(metrics)}`);

            this.setState((state, props) => {
                const newMetrics = [...state.metrics];
                for (let i = 0; i < newMetrics.length; ++i) {
                    if (newMetrics[i].metrics.name === metrics.metrics.name) {
                        newMetrics[i] = metrics;
                        return { metrics: newMetrics };
                    }
                }

                return {
                    metrics: [...newMetrics, metrics]
                }
            });
        });
    }

    onAgreementReceived(data) {
        this.setState({ agreement: data });
    }

    onGenerateTestData() {
        fetch(apiEndpoint('/api/v1/development/sensor-things-test-data'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.agreement.producer.name,
            })
        });
    }

    render() {
        const { agreement, image_type } = this.state;

        if (agreement !== undefined) {

            return (
                <div>
                    <Row>
                        <Col><DataSharingAgreement
                            agreement={agreement}
                            image_type={image_type}
                        />
                        </Col>
                        <Col>
                            <Row>
                                <Button
                                    variant='primary'
                                    size='lg'
                                    block
                                    onClick={this.onGenerateTestData.bind(this)}>
                                    Generate test data
                                </Button>
                            </Row>
                            <Row>
                                {this.state.observations.length > 0 &&
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Phenomenon Time</th>
                                                <th>Observation Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.observations.map((observation, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{formatDateTime(observation.observation.phenomenonTime)}</td>
                                                        <td>{observation.observation.result.toString()}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
                <Spinner />
            );
        }
    }

}