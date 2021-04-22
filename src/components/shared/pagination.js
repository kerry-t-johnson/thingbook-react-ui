import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import CardDeck from 'react-bootstrap/CardDeck';
import { Table } from 'react-bootstrap';
import { fetchJson } from './utils';
let _ = require('lodash');

class PagedBase extends React.Component {

    onPageSelected(page_number) {
        this.props.fetchPage({
            page_number: page_number,
            page_size: this.props?.page?.page?.page_size ?? 20,
        });
    }

    render() {
        return (
            <div className='container bg-light'>
                {this.props?.page?.page?.page_number !== undefined && this.props?.page?.page?.pages_total !== undefined &&
                    <Pager
                        key="top-pager"
                        onPageSelected={this.onPageSelected.bind(this)}
                        currentPage={this.props?.page?.page?.page_number}
                        totalPages={this.props?.page?.page?.pages_total} />
                }
                {this.onRender()}
                {this.props?.page?.page?.page_number !== undefined && this.props?.page?.page?.pages_total !== undefined &&
                    <Pager
                        key="bottom-pager"
                        onPageSelected={this.onPageSelected.bind(this)}
                        currentPage={this.props?.page?.page?.page_number}
                        totalPages={this.props?.page?.page?.pages_total} />
                }
            </div>
        );

    }
}

export class PagedCardDeck extends PagedBase {

    onRender() {
        if (this.props.page?.items) {
            const items = this.props.page.items.map((item) => {
                const ComponentName = this.props.item_component;
                return <ComponentName key={item.name} item={item} />
            });

            return (
                <CardDeck className="row row-cols-2">{items}</CardDeck>
            );
        }
        else {
            return (<span>Loading ...</span>);
        }
    }
}


export class PagedTable extends PagedBase {

    onRender() {
        if (this.props.page?.items) {

            const headers = this.props.columns.map((column) => {
                return column?.header ?? '';
            });

            const rows = this.props.page.items.map((item) => {
                return this.props.columns.map((column, index) => {
                    const value = _.get(item, column.attribute);
                    return column.formatter !== undefined ? column.formatter(value) : value;
                });
            });

            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {headers.map((item, index) => {
                                return (<th key={index}>{item}</th>);
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => {
                                        return (<td key={cellIndex}>{cell}</td>);
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            );
        }
        else {
            return (<span>Loading ...</span>);
        }
    }
}


export class Pager extends React.Component {
    onPageSelectedCallback(page_number) {
        this.props.onPageSelected(page_number);
    }

    render() {
        let pageItems = [];

        pageItems.push(<Pagination.First key="first" onClick={this.onPageSelectedCallback.bind(this, 0)} disabled={this.props.currentPage === 0} />);
        pageItems.push(<Pagination.Prev key="prev" onClick={this.onPageSelectedCallback.bind(this, this.props.currentPage - 1)} disabled={this.props.currentPage === 0} />);

        const firstPage = Math.max(0, this.props.currentPage - 5);
        const lastPage = Math.min(this.props.totalPages, this.props.currentPage + 5);

        if (firstPage > 0) {
            pageItems.push(<Pagination.Ellipsis key="ellipses1" />);
        }

        for (let i = firstPage; i < lastPage; ++i) {
            pageItems.push(
                <Pagination.Item key={i} active={i === this.props.currentPage} onClick={this.onPageSelectedCallback.bind(this, i)} >
                    {i + 1}
                </Pagination.Item>
            );
        }

        if (lastPage < this.props.totalPages) {
            pageItems.push(<Pagination.Ellipsis key="ellipses2" />);
        }

        pageItems.push(<Pagination.Next key="next" onClick={this.onPageSelectedCallback.bind(this, this.props.currentPage + 1)} disabled={this.props.currentPage === this.props.totalPages - 1} />);
        pageItems.push(<Pagination.Last key="last" onClick={this.onPageSelectedCallback.bind(this, this.props.totalPages - 1)} disabled={this.props.currentPage === this.props.totalPages - 1} />);

        if (pageItems.length > 5) {
            return (
                <Pagination className="d-flex justify-content-center">{pageItems}</Pagination >
            );
        }
        else {
            return null;
        }
    }
}

export default class PageFetchWrapper extends React.Component {

    componentDidMount() {
        this.fetchItems({ page_number: 0, page_size: 10 });
    }

    fetchItems(query) {
        fetchJson(this.onResponse.bind(this), this.props.resource_path, query);
    }

    onResponse(data) {
        this.setState({ page: data });
    }

    render() {
        const ComponentRenderer = this.props.componentRenderer ?? PagedCardDeck;

        return (
            <ComponentRenderer
                fetchPage={this.fetchItems.bind(this)}
                page={this.state?.page}
                {...this.props}
            />
        );
    }
}