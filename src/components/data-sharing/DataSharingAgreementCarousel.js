import React from "react";
import { Carousel, Row } from "react-bootstrap";
import { fetchJson } from "../shared/utils";
import DataSharingAgreement from "./DataSharingAgreement";


export default class DataSharingAgreementCarousel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                items: [],
                page: {}
            },
        }
    }

    componentDidMount() {
        fetchJson(this.onJsonResults.bind(this), '/api/v1/data-sharing/agreement');
    }

    onJsonResults(results) {
        this.setState({ data: results });
    }

    render() {
        const { items } = this.state.data;

        return (
            <div>
                <Row className="justify-content-center">
                    <Carousel>
                        {items.map((agreement, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <DataSharingAgreement agreement={agreement} />
                                </Carousel.Item>
                            )
                        })

                        }
                    </Carousel>
                </Row>
            </div >
        );
    }
}
