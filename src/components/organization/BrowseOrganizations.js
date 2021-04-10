import React from "react";
import CardDeck from 'react-bootstrap/CardDeck';
import Pager from '../shared/pagination';
import OrganizationSummary from './OrganizationSummary';

export default class BrowseOrganizations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            pageSize: 10,
            items: [],
            totalPages: 0
        };
    }

    componentDidMount() {
        this.fetchItems(this.state.page, this.state.pageSize);
    }

    fetchItems(pageNum, pageSize) {
        fetch(`${this.props.baseUrl}/organization?page_number=${pageNum}&page_size=${pageSize}`)
            .then(response => response.json())
            .then(this.onResponse.bind(this));
    }

    onPageSelected(pageNum) {
        this.fetchItems(pageNum, this.state.pageSize);
    }

    onResponse(data) {
        this.setState({
            page: data?.page.page_number,
            pageSize: data?.page.page_size,
            items: data?.items,
            totalPages: data?.page.pages_total
        });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <OrganizationSummary key={item.name} org={item} />
            );
        });

        return (
            <div className='container bg-light'>
                <Pager
                    key="top-pager"
                    onPageSelected={this.onPageSelected.bind(this)}
                    currentPage={this.state.page}
                    totalPages={this.state.totalPages} />
                <CardDeck className="row row-cols-2">{items}</CardDeck>
                <Pager
                    key="bottom-pager"
                    onPageSelected={this.onPageSelected.bind(this)}
                    currentPage={this.state.page}
                    totalPages={this.state.totalPages} />
            </div>
        );
    }
}