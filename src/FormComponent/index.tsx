import React, { useState } from 'react'
import CellComponent from '../CellComponent'
import './styles/style.css'

export default function FormComponent({onSubmit}: any) {
    const [fields, setFields] = useState<Record<string, string>>({
        name: '',
        type: '',
        color: '#000000'
    })
    return <div>
        {
            Object.keys(fields).map((item: string) => {
                
                return <div key={item} className="item">
                    <span> {item}: </span>
                    <CellComponent {...{
                        value: fields[item],
                        onChange: ({target: {value}}: any) => {
                            setFields({...fields, [item]: value})
                        },
                        type: item === 'color' ? 'color' : 'text'
                    }}/>
                </div>
            })
        }
        <div className="form-button">
            <button {...{
                disabled: Object.values(fields).some(item => item === ''),
                onClick: () => {
                    onSubmit(fields)
                }
            }}>
                Сохранить
            </button>
        </div>
    </div>
}