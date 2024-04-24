export default function FleExport (prop:{onClick:(e:any)=>void, label:string}) {
    return (
        <button
            className={"w-full border border-gray-500"}
            onClick={prop.onClick}
        >{prop.label}
        </button>
    )
}