import React, {Component} from "react";

export default class Paginator extends Component{

    render() {

       const {items, pageLength, currentPage} = this.props;

        const pageCount = Math.ceil(items / pageLength);
        
        const pages = [];

        for (let i = 1; i <= pageCount ; i++) {
            pages.push((
                <li key={i} className={`page-item${i === currentPage ? ' active' : ''}`}>
                    <a className="page-link" href={'/view/' + i}>{i}</a>
                </li>
            ));
        }

        return (
            <div className="row space-top">
                <div className="col-md-12">
                    <ul className="pagination">
                        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                            <a className="page-link" href={`/view/${Number(currentPage) - 1}`}>«</a>
                        </li>
                        {pages}
                        <li className={`page-item${currentPage === pageCount ? ' disabled' : ''}`}>
                            <a className="page-link" href={`/view/${Number(currentPage) + 1}`}>»</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}