import React, { Component }         from 'react';
import ReactTable                   from 'react-table';


import 'react-table/react-table.css';


class TableWrapper extends Component {

    render() {
        return (
            <ReactTable
                sortable={true}
                showPageSizeOptions={false}
                showPagination={false}
                columns={this.props.columns}
                data={this.props.data}
                defaultPageSize={this.props.defaultPageSize}
                filterable={this.props.filterable}
                pivotBy={this.props.pivotBy}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
                }}
            />
        )
    }
}



export default TableWrapper;