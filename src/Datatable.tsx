import React, { createRef } from 'react';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

export enum Actions { SEARCH, SORT, PAGE }

export type ActionTypes =
  | { type: Actions.SEARCH, key: string }
  | { type: Actions.SORT, key: string }
  | { type: Actions.PAGE, key: number }

export interface Header {
  title: string,
  sortable: boolean,
  render?: Function,
  key: string
}

export interface Pagination {
  currentData: any[],
  pages: any[],
  lastPage: number,
  currentPage: number
}

export interface DatatableInterface extends Pagination {
  dispatch: React.Dispatch<ActionTypes>,
  header: Header[]
}

const Datatable: React.SFC<DatatableInterface> = ({ currentData, currentPage, lastPage, pages, dispatch, header }) => {

  const keyword: React.RefObject<HTMLInputElement> = createRef();

  return (
    <div className="pt-2 antialiased font-sans font-serif font-monotext-center">
      <div className="w-4/5 mx-auto my-1">
        {/* Search  */}
        <div className="w-full max-w-sm">
          <div className="flex items-center">
            <input
              className="appearance-none block w-full bg-primary text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary focus:border-gray-500"
              type="text"
              placeholder="Search..."
              ref={keyword}
              onKeyUp={() => setTimeout(() => {
                  keyword.current &&
                  dispatch({ type: Actions.SEARCH, key: keyword.current.value })
                }, 1000)
              }
            />
          </div>
        </div>
        {/* Table */}
        <div className="bg-primary shadow-md rounded overflow-auto">
          <table className="w-full table-auto border-collapse whitespace-no-wrap">
            <thead>
              <tr>
                {
                  header.map(col =>
                    <th key={col.key} className="py-4 px-6 bg-primary font-bold uppercase text-sm text-primary border-b border-gray-500">
                      {col.sortable && <button onClick={() => dispatch({ type: Actions.SORT, key: col.key })} className="focus:outline-none">
                        <i
                          className="fa fa-sort mx-1"
                        ></i>
                      </button>}
                      {col.title}
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                currentData.map((row, index) =>
                  <tr key={index} className="hover:bg-secondary">
                    {
                      header.map(col =>
                        <td key={col.key} className="py-4 px-6 border-b border-gray-500 text-center">
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {
          lastPage > 1 &&
          <div className="flex flex-wrap justify-between pt-3">
            <p>
              Page {currentPage}/{lastPage}
            </p>
            <ul className="inline-flex list-inside rounded">
              <li>
                <button
                  className="focus:outline-none block text-white hover:bg-secondary bg-primary px-3 py-2 mr-1 border rounded"
                  onClick={() => dispatch({ type: Actions.PAGE, key: 1 })}
                >
                  <i className="fa fa-angle-double-left"></i>
                </button>
              </li>
              <li>
                <button
                  className="focus:outline-none block text-white hover:bg-secondary bg-primary px-3 py-2 mr-1 border rounded"
                  disabled={currentPage <= 1}
                  onClick={() => dispatch({ type: Actions.PAGE, key: currentPage - 1 })}
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </li>
              {
                pages.map((page, index) =>
                  <li key={page}>
                    <button
                      onClick={() => dispatch({ type: Actions.PAGE, key: page })}
                      className={`focus:outline-none block text-white hover:bg-secondary border ${currentPage === page ? "bg-secondary" : "bg-primary"} px-3 py-2 ${index === 0 ? "rounded-l border-l" : index === (pages.length - 1) && "rounded-r border-r"}`}>
                      {page}
                    </button>
                  </li>
                )
              }
              <li>
                <button
                  className="focus:outline-none block text-white hover:bg-secondary bg-primary px-3 py-2 ml-1 border rounded"
                  disabled={currentPage >= lastPage}
                  onClick={() => dispatch({ type: Actions.PAGE, key: currentPage + 1 })}
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch({ type: Actions.PAGE, key: lastPage })}
                  className="focus:outline-none block text-white hover:bg-secondary bg-primary px-3 py-2 ml-1 border rounded"
                >
                  <i className="fa fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default Datatable;