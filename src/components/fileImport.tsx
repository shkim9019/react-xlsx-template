export default function FileImport (prop:{onChange:(e:any)=>void}) {
    return (
        <input
            className={"w-full"}
            type={"file"}
            onChange={(e:any) => prop.onChange(e.target.files[0])}
        />)
}