import React from 'react';
import './styles/style.css';
import CellComponent from '../CellComponent';

export default function TableComponent() {
    const dataFromStorage = localStorage.getItem('tableData')
    const [tableData, setTableData] = React.useState(dataFromStorage ? JSON.parse(dataFromStorage) : [])
    const tableHeader = tableData.length > 0 ? Object.keys(tableData[0]) : []

    const onChangeInCell = ({target: {value}}: any, index: number, index2: number) => { // В аргументе ф-ции вложеная диструкткризация. Аргумент можно заменить на обычную переменную, например "е". Тогда далее в ф-ции сделует заменить "value" на "e.target.value"
        setTableData( (prevTableData: any) => {
            prevTableData[index][tableHeader[index2]] = value
            return [...prevTableData] // Здесь делается новый массив (перетерается ссылка), иначе, при неглубоком сравнении ничено не перерисуется
        })
    }

    return <table>
        <thead>
            <tr>
                <th></th>
                {
                    tableHeader.map((item: string) => <th> { item } </th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                tableData.map((item: any, index: number) => {
                    const cells = Object.keys(item).map((property: string) => item[property])
                    return <tr key={index}>
                        <th> { index } </th>
                        {
                            cells.map((cell: any, index2: number) => {
                                return <th key={index2}>
                                    <CellComponent {...{
                                        value: cell,
                                        onChange: (e: any) => { onChangeInCell(e, index, index2) },
                                        type: index2 === 2 ? 'color' : 'text'
                                    }} />
                                </th>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
        <tfoot>
            {/* <tr>
                <th> Добавить новую строку </th>
            </tr> */}
        </tfoot>
    </table>
}