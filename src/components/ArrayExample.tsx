import FileImport from "./fileImport";
import {getColumnWidthList, isValidFileContent, onChangeFileByArray} from "../utils";
import FleExport from "./fileExport";
import FileContentTable from "./fileContentTable";
import React, {useState} from "react";
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";

export default function ArrayExample(){
    const [rows, setRows] = useState<Array<any[]>>();
    const onClick = (e:any) => {
        if(!rows) return;

        const newHeaders:string[] = ["NO","회사코드","이름","이메일","국적","전화번호","생년월일"];
        const workbook:WorkBook   = utils.book_new();
        const worksheet:WorkSheet = utils.json_to_sheet([]);

        // A1에 custom 헤더 생성
        utils.sheet_add_aoa(worksheet, [newHeaders], {origin:"A1"});

        // 데이터 세팅
        utils.sheet_add_json(worksheet, rows.slice(1), {origin:"A2", skipHeader:true})

        // 워크시트 추가
        utils.book_append_sheet(workbook, worksheet, "TEST");

        worksheet["!cols"] = getColumnWidthList(rows);
        // 스타일 적용 해야함
        // https://stackoverflow.com/questions/50147526/sheetjs-xlsx-cell-styling 참고
        writeFile(workbook, "testFile.xlsx")
    }

    return (
        <div className={"w-full flex flex-col items-center gap-8"}>
            <div className={"w-full flex justify-between"}>
                <FileImport onChange={(file:File) => onChangeFileByArray(file,isValidFileContent, setRows)}/>
                <h1 className={"w-full text-2xl font-semibold"}>이중 배열 이용</h1>
                <FleExport label={"내보내기"} onClick={onClick}/>
            </div>
            {rows && <FileContentTable data={rows.slice(1)} header={rows[0]}/>}
        </div>
    )
}