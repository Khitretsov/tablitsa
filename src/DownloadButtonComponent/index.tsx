import React from 'react'

export default function DownloadButtonComponent(data: any) {
    return <button {...{
        onClick: () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
            const dlAnchorElem = document.createElement('a')
            if (dlAnchorElem) {
                dlAnchorElem.setAttribute("href", dataStr)
                dlAnchorElem.setAttribute("download", "data.json")
                dlAnchorElem.click()
            }
        }
    }}> Сделать выгрузку данных </button>
} 