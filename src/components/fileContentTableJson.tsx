import {createColumnHelper, flexRender, getCoreRowModel, RowSelectionState, useReactTable} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";

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

const TableCell = ({getValue, row, column, table}:any) => {
    const initValue = getValue();
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(initValue)
    }, [initValue]);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value)

    }

    const onClick = (e:any) =>{
        // console.log(e.target.value, row);
        console.log(row.getIsSelected(), table.getState().rowSelection)
        // console.log(table.getState().rowSelection, table.getSelectedRowModel().flatRows)
    }

    return (
        <input
            className={"w-full focus:outline-4 focus:outline-amber-400"}
            value={value}
            onChange={e => setValue(e.target.value)}
            onClick={onClick}
            onBlur={onBlur}
            readOnly
        />
    )
}

const columns = [
    columnHelper.accessor("NO", {
        header: "NO",
    }),
    columnHelper.accessor("name", {
        header: "이름",
        cell:TableCell
    }),
    columnHelper.accessor("email", {
        header:  "이메일",
        cell:TableCell
    }),
    columnHelper.accessor("nationality", {
        header:"국적",
        cell:TableCell
    }),
    columnHelper.accessor("contact", {
        header: "전화번호",
        cell:TableCell
    }),
    columnHelper.accessor("birthDate", {
        header: "생년월일",
        cell:TableCell
    }),
]

export default function FileContentTableJson({data, header}:FileContentType) {
    const [columnData, setColumnData] = useState<DataType[]>(data);
    const [selectedRow, setSelectedRow] = useState<RowSelectionState>({});

    useEffect(() => {
        console.log("selectedRow >> ", selectedRow)
    }, [selectedRow]);


    const table = useReactTable({
        data: columnData, columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange:setSelectedRow,
        state:{
          rowSelection:selectedRow
        },
        enableMultiRowSelection: false,
        meta: {
            updateData: (rowIndex: number, columnId: string, value: string) => {
                setColumnData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        }
    })

    return (
            <table className={"w-full table-auto border border-slate-500 border-separate border-spacing-10"}>
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
                    <tr key={row.id} onClick={() => row.toggleSelected()}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                {/*<tfoot>*/}
                {/*{table.getFooterGroups().map(footerGroup => (*/}
                {/*    <tr key={footerGroup.id}>*/}
                {/*        {footerGroup.headers.map(header => (*/}
                {/*            <th key={header.id}>*/}
                {/*                {header.isPlaceholder*/}
                {/*                    ? null*/}
                {/*                    : flexRender(*/}
                {/*                        header.column.columnDef.footer,*/}
                {/*                        header.getContext()*/}
                {/*                    )}*/}
                {/*            </th>*/}
                {/*        ))}*/}
                {/*    </tr>*/}
                {/*))}*/}
                {/*</tfoot>*/}
            </table>
    )
}