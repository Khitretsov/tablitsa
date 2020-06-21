import React from 'react';
import './styles/style.css';
import TableComponent from '../TableComponent'

class MainModule extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    const data = localStorage.getItem('tableData')
    this.state = {
      tableData: !!data ? data : '',
    }
  }

  render() {
    return <div className="App">
    <header className="App-header">
      {
        this.state.tableData.length === 0 ? (
          <input {...{
            type: 'file',
            accept: '.json',
            content: 'sdfsdfsdfsdfsdf',
            onChange: (event: any) => {
              const reader = new FileReader()
              reader.readAsText(event.target.files[0])
              const callback = (result: any) => {
                localStorage.setItem('tableData', result)
                this.setState((state: any) => ({...state, tableData: result}), () => {
                })
              }
              
              reader.onload = function() {
                typeof reader.result === 'string' && callback(reader.result)
              };
    
              reader.onerror = function() {
                console.log(reader.error);
              };
            }
          }} />
        ) : (
          <button {...{
            onClick: () => {
              localStorage.removeItem('tableData')
              this.setState({tableData: ''})
            }
          }}> öбнулить данные </button>
        )
      }
    </header>
    <div className="content">
      {
        this.state.tableData.length > 0 && (
          <TableComponent />
        )
      }
    </div>
  </div>
  }
}

export default MainModule;
  