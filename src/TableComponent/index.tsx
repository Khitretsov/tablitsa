import React, { useState } from 'react';
import './styles/style.css';
import CellComponent from '../CellComponent';
import ModalWindowWrapperComponent from '../ModalWindowWrapperComponent';
import FormComponent from '../FormComponent';
import DownloadButtonComponent from '../DownloadButtonComponent';

let rowNumberForDeleting = 0

export default function TableComponent() {
    const dataFromStorage = localStorage.getItem('tableData')
    const [isAddModalShow, setAddModalShowing] = React.useState(false)
    const [isDeleteModalShow, setDeleteModalShowing] = React.useState(false)
    const [tableData, setTableData] = React.useState(dataFromStorage ? JSON.parse(dataFromStorage) : [])
    const tableHeader = tableData.length > 0 ? Object.keys(tableData[0]) : []
    const [cellsForChange, setCellsForChange] = useState<Array<null | number>>([null, null])

    const onChangeInCell = (value: string, index: number, index2: number) => { // В аргументе ф-ции вложеная диструкткризация. Аргумент можно заменить на обычную переменную, например "е". Тогда далее в ф-ции сделует заменить "value" на "e.target.value"
        setTableData( (prevTableData: any) => {
            prevTableData[index][tableHeader[index2]] = value
            return [...prevTableData] // Здесь делается новый массив (перетерается ссылка), иначе, при неглубоком сравнении ничено не перерисуется
        })
    }

    React.useEffect(() => {
        if (cellsForChange.every(item => item !== null)) {
            const firstIndex = cellsForChange[0] ? cellsForChange[0] : 0 // Сучий тайпскрипт не понимает проверки на null, которая на строке выше
            const secondIndex = cellsForChange[1] ? cellsForChange[1] : 0
            const cellItem = tableData[firstIndex]
            tableData[firstIndex] = tableData[secondIndex]
            tableData[secondIndex] = cellItem
            setCellsForChange([null, null])
            setTableData([...tableData])
        }
    }, [cellsForChange])

    return <>
        <button {...{
            onClick: () => {
                localStorage.setItem('tableData', JSON.stringify(tableData))
            }
        }}> Сохранить внесённые изменения </button>
        <DownloadButtonComponent data={ tableData } />
        <div>
            Для изменения порядка строк, нажмите номера тех строк, которые вы хотите поменять местами
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    {
                        tableHeader.map((item: string) => <th key={item}> { item } </th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((item: any, index: number) => {
                        const cells = Object.values(item)
                        return <tr key={index}>
                            <th>
                                <button {...{
                                    onClick: () => {
                                        if (cellsForChange[0] === null) {
                                            setCellsForChange([index, null])
                                        } else {
                                            const arr = [...cellsForChange]
                                            arr[1] = index
                                            setCellsForChange(arr)
                                        }
                                    },
                                    disabled: cellsForChange[0] === index
                                }}>
                                    { index }
                                </button>
                            </th>
                            {
                                cells.map((cell: any, index2: number) => {
                                    return <th key={index2}>
                                        <CellComponent {...{
                                            value: cell,
                                            onChange: ({target: {value}}: any) => { onChangeInCell(value, index, index2) },
                                            type: index2 === 2 ? 'color' : 'text'
                                        }} />
                                    </th>
                                })
                            }
                            <th>
                                <button {...{
                                    onClick: () => {
                                        rowNumberForDeleting = index // Сохраниение номера удоляемой строки с помощью замыкания
                                        setDeleteModalShowing(!isDeleteModalShow)
                                    }
                                }}> 
                                    X
                                </button>
                            </th>
                        </tr>
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <th> <button {...{
                        onClick: () => {
                            setAddModalShowing(true)
                        }
                    }}> + </button> </th>
                </tr>
            </tfoot>
        </table>
        {/* Ниже блоки модальных окон */}
        {
            isAddModalShow && <ModalWindowWrapperComponent {...{
                title: 'Добавление новой записи',
                onCancel: () => {
                    setAddModalShowing(!isAddModalShow)
                }
            }}>
                <FormComponent {...{
                    onSubmit: (form: any) => {
                        setTableData(tableData.concat(form))
                        setAddModalShowing(!isAddModalShow)
                    }
                }}/>
            </ModalWindowWrapperComponent>
        }
        {
            isDeleteModalShow && <ModalWindowWrapperComponent {...{
                title: 'Вы точно хотите удалить запись?',
                onCancel: () => {
                    setDeleteModalShowing(!isDeleteModalShow)
                }
            }}>
                <button {...{
                    onClick: () => {
                        const newArr = [...tableData]
                        newArr.splice(rowNumberForDeleting, 1)
                        setTableData(newArr)
                        setDeleteModalShowing(!isDeleteModalShow)
                    }
                }}>
                    Удалить
                </button>
            </ModalWindowWrapperComponent>
        }
    </>
}