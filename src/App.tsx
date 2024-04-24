import React, {useState} from 'react';
import './App.css';
import FileImport from "./components/fileImport";
import FileContentTable from "./components/fileContentTable";
import {getColumnWidthList, isValidFileContent, onChangeFile} from "./utils";
import FleExport from "./components/fileExport";
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";

function App() {
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

        worksheet["!cols"] = getColumnWidthList(rows, newHeaders.length);
        writeFile(workbook, "testFile.xlsx")
    }

    return (
    <div className="App flex flex-col justify-center items-center gap-8 p-20">
        <div className={"w-full flex justify-between"}>
            <FileImport onChange={(file:File) => onChangeFile(file,isValidFileContent, setRows)}/>
            <h1 className={"w-full text-2xl font-semibold"}>가입자 업로드</h1>
            <FleExport label={"내보내기"} onClick={onClick}/>
        </div>
        {rows && <FileContentTable data={rows.slice(1)} header={rows[0]}/>}
    </div>
);
}

export default App;
