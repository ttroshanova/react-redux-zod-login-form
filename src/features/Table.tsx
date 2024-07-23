import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../types'

const Table = () => {
  const tableData = useSelector((state: RootState) => state.table.tableData)
  return (
    <>
    {(tableData?.headers && tableData?.body) && (
          <table>
          <thead>
            <tr>
              {tableData.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.body.map((columnData, id) => (
              <tr key={id}>{Object.values(columnData).map((value, valueId) => (
                <td key={valueId}>{`${value}`}</td>
              ))}
              </tr>
            ))}
          </tbody>
        </table>
    )}
  </>
  )
}

export default Table