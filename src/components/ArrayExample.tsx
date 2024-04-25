import FileImport from "./fileImport";
import {
    exportExcelFile,
    getColumnWidthList,
    getCustomCellStyleArray,
    getHeaderStyle,
    isValidFileContent,
    onChangeFileByArray
} from "../utils";
import FleExport from "./fileExport";
import FileContentTable from "./fileContentTable";
import React, {useState} from "react";

export default function ArrayExample(){
    const [rows, setRows] = useState<Array<any[]>>();
    const onClick = (e:any) => {
        if(!rows) return;

        const newHeaders:string[] = ["NO","회사코드","이름","이메일","국적","전화번호","생년월일"];
        const columnWidthList = getColumnWidthList(rows)
        exportExcelFile(getHeaderStyle(newHeaders), getCustomCellStyleArray(rows.slice(1)), "TEST", "testFile.xlsx",columnWidthList  )

    }

    return (
        <div className={"w-full min-h-80 flex flex-col items-center gap-8 border border-gray-500 p-10"}>
            <div className={"w-full flex justify-between"}>
                <FileImport onChange={(file:File) => onChangeFileByArray(file,isValidFileContent, setRows)}/>
                <h1 className={"w-full text-2xl font-semibold"}>이중 배열 이용</h1>
                <FleExport label={"내보내기"} onClick={onClick}/>
            </div>
            {rows && <FileContentTable data={rows.slice(1)} header={rows[0]}/>}
        </div>
    )
}