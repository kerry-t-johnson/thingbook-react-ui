import Badge from 'react-bootstrap/Badge';
import React from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { PagedTable } from "../shared/pagination";
import { fetchJson, formatDate } from '../shared/utils';


export default class OrganizationAgreements extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            producer: undefined,
            consumer: undefined,
        };
    }

    componentDidMount() {
        this.fetchProducerPage({ page_number: 0, page_size: 20 });
        this.fetchConsumerPage({ page_number: 0, page_size: 20 });
    }

    fetchProducerPage(query) {
        console.log('fetchProducerPage');
        query.role = 'producer';
        fetchJson(this.onProducerResponse.bind(this), this.selfLink, query);
    }

    onProducerResponse(data) {
        console.log('onProducerResponse');
        this.setState({ producerData: data })
    }

    fetchConsumerPage(query) {
        console.log('fetchConsumerPage');
        query.role = 'consumer';
        fetchJson(this.onConsumerResponse.bind(this), this.selfLink, query);
    }

    onConsumerResponse(data) {
        console.log('onConsumerResponse');
        this.setState({ consumerData: data })
    }

    render() {
        const { producerData, consumerData } = this.state;
        const columns = [
            { header: "Name", attribute: 'name' },
            {
                header: "State", attribute: 'state', formatter: function (value) {
                    switch (value) {
                        case 'ACTIVE':
                            return <Badge variant='success'>{value}</Badge>
                        default:
                            return <Badge variant='warning'>{value}</Badge>
                    }
                }
            },
            { header: "Expiration", attribute: 'expirationDate', formatter: formatDate },
            {
                header: "Keywords", attribute: 'template.keywords', formatter: function (value) {
                    return value.map((v, index) => {
                        return (<Badge key={index} className='mr-2' variant='info'>{v}</Badge>);
                    });
                }
            }
        ];

        return (
            <Tabs defaultActiveKey="producer" >
                <Tab eventKey="producer"
                    title={"As producer (" + (producerData?.items?.length ?? 0) + ")"}
                    disabled={producerData?.items?.length === undefined || producerData?.items?.length === 0}>
                    <PagedTable
                        columns={columns}
                        fetchPage={this.fetchProducerPage.bind(this)}
                        page={producerData}
                        componentRenderer={PagedTable} />
                </Tab>
                <Tab eventKey="consumer"
                    title={"As consumer (" + (consumerData?.items?.length ?? 0) + ")"}
                    disabled={consumerData?.items?.length === undefined || consumerData?.items?.length === 0}>
                    <PagedTable
                        columns={columns}
                        fetchPage={this.fetchConsumerPage.bind(this)}
                        page={consumerData}
                        componentRenderer={PagedTable} />
                </Tab>
            </Tabs>
        );
    }
}