type FileContentType = {
    data:any[],
    header:string[]
}

export default function FileContentTable({data, header}:FileContentType) {
    return (
        <table className={"table-auto border border-slate-500 border-separate border-spacing-10 "}>
            <thead>
                <tr>
                    {header.map((item: string) => <th key={item}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
            {data.map((item: any, index: number) =>
                <tr key={index}>
                    {header.map( (_: string, index:number) => <td key={item[index]}>{item[index]}</td> )}
                </tr>
            )}
            </tbody>
        </table>
    )
}