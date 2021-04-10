import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default class Pager extends React.Component {
    onPageSelectedCallback(pageNum) {
        this.props.onPageSelected(pageNum);
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

        return (
            <Pagination className="d-flex justify-content-center">{pageItems}</Pagination >
        );
    }
}
