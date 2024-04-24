import {read, utils, WorkBook, WorkSheet} from "xlsx";

export const trimData = (data:string|number) => {
    return data.toString().trimStart().trimEnd();
}

export const onChangeFile = (file:File,isValidFileContent:(data:any[][])=>boolean, setState:any) => {
    const reader = new FileReader();
    reader.onload = function(e:any):void{
        const changedData = xlsxToArrayData(e.target.result);
        isValidFileContent(changedData) && setState(changedData);
    }
    reader.readAsArrayBuffer(file)
}


export const xlsxToArrayData = (file:File):any[][] => {
    const workbook:WorkBook = read(file, {cellDates:true});
    const worksheet:WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    const result:any[][] = utils.sheet_to_json(worksheet, {header:1});

    return result.map((data:any[][])=>{ return data.map((item:any)=>{
        if(item instanceof Date){
            return item.toLocaleDateString().replaceAll(" ","");
        }

        const trimItem = trimData(item);

        if(typeof item === "number"){
            return Number(trimItem);
        }
        return trimItem;
    })})

}

export const xlsxToJsonData = (file:File):any[][] => {
    const workbook:WorkBook = read(file, {cellDates:true});
    const worksheet:WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    return utils.sheet_to_json(worksheet);
}

export const getColumnWidthList = (originRows:any[][], headerLength:number) => {
    const resultList = [{wch:10}];

    originRows.map((row:any[]) => {
         row.map((data:any, index:number):void => {
             if(resultList[index] === undefined) {
                 resultList[index] = ({wch: 10})
             }
            if(data.length > resultList[index].wch){
                resultList[index].wch = data.length
            }
        })
    })

    console.log("resultList >>> ", resultList)
    return resultList
}