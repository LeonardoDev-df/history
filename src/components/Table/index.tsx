import { Fragment } from 'react'
import {
    Column,
    useTable,
    useRowSelect,
    usePagination,
    useSortBy
} from 'react-table'

import {
    Container,
    StTable,
    TableWrapper,
    PaginationBar,
    StArrowLeft,
    StArrowRight,
    StDoubleArrowLeft,
    StDoubleArrowRight,
    StNormalArrowUp,
    StNormalArrowDown
} from './styles'
import { Copy } from '../../styles/pages/shared/control-panel.styles'

interface TableProps {
    columns: Column<any>[]
    data: Array<any>
    actionButtons: (row: any) => JSX.Element
}

export function Table({
    columns,
    data,
    actionButtons: ActionButtons
}: TableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                ...columns,
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ column }) => <p key={column.id}>Ações</p>,
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <Fragment key={row.id}>
                            {/* Tem o row.original que retorna tudo do objeto
                                e o values que retorna só o que é usado na tabela
                            */}
                            <ActionButtons row={row.values} />
                        </Fragment>
                    )
                }
            ])
        }
    )

    // const emptyRows = pageSize - Math.min(pageSize, pageSize - page.length)
    const emptyRows = pageSize - page.length

    return (
        <Container>
            <TableWrapper>
                <StTable {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <StNormalArrowDown />
                                                ) : (
                                                    <StNormalArrowUp />
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)

                            // Renderiza as rows
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                        {emptyRows > 0 && data.length > 0 && (
                            <tr
                                style={{ height: 54.6 * emptyRows, border: 0 }}
                            ></tr>
                        )}
                    </tbody>
                </StTable>
                {!data.length && <Copy>Nenhum dado encontrado</Copy>}
            </TableWrapper>

            <PaginationBar>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>
                </span>

                <span>
                    Itens por página:{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </span>

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <StDoubleArrowLeft />
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    <StArrowLeft />
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    <StArrowRight />
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    <StDoubleArrowRight />
                </button>
            </PaginationBar>
        </Container>
    )
}
