import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useReducer, useState} from "react";

type DataType = {
    NO:number,
    companyCode:number,
    name:string,
    email:string,
    nationality:string,
    contact:string,
    birthDate:string
}

type FileContentType = {
    data:any[],
    header:string[]
}

const columnHelper = createColumnHelper<DataType>();

const columns = [
    columnHelper.accessor("NO",{
        header: "NO",
    }),
    columnHelper.accessor("name", {
        header: "이름",

    }),
    columnHelper.accessor("email", {
        header:  "이메일",

    }),
    columnHelper.accessor("nationality", {
        header:"국적",

    }),
    columnHelper.accessor("contact", {
        header: "전화번호",
        // footer: () => "합계 : "
    }),
    columnHelper.accessor("birthDate", {
        header: "생년월일",
        // footer: info => info.column.id
    }),
]

export default function FileContentTableJson({data, header}:FileContentType) {
    const rerender = useReducer(() => ({}), {})[1]
    const [columnData, setColumnData] = useState<DataType[]>(data);
    const table = useReactTable({data:columnData, columns, getCoreRowModel: getCoreRowModel()})

    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
            <div className="h-4"/>
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    )
}