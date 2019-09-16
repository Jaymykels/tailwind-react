import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import { dataReducer, initialState, Actions } from './dataReducer'
import Datatable, { Header } from './Datatable'
import React, { useReducer, useEffect, useState } from 'react';

const App: React.FC = () => {

  const header: Header[] = [
    {
      title: "Name",
      sortable: true,
      key: "name"
    },
    {
      title: "Gender",
      sortable: false,
      key: "gender",
      render: (row: any) => row.gender === "male" ? "👨" : row.gender === "female" ? "👩" : "😕"
    },
    {
      title: "Region",
      sortable: true,
      key: "region"
    }
  ]

  const [data, setData] = useState<any[]>([])

  const [tableData, dispatch] = useReducer(dataReducer, { ...initialState, data, searchData: data })

  useEffect(() => {
    dispatch({ type: Actions.SET_DATA, key: data })
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`https://uinames.com/api/?amount=100`);
        let users = await response.json()
        setData(users)
      } catch(err) {console.log(err)}
    }
    fetchData()
  }, [])

  return (
    <Datatable {...tableData.paginated} dispatch={dispatch} header={header} />
  )
}

export default App;