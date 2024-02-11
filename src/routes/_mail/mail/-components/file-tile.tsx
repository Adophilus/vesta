import { XIcon } from "lucide-react"
import { FunctionComponent } from "react"

export const FileTile: FunctionComponent<{ file: File, onRemove: () => void }> = ({ file, onRemove }) => {
  const url = URL.createObjectURL(file)

  return (
    <div
      className="relative inline-flex group w-24 border-[3px] border-foreground rounded-lg aspect-square">
      <button
        type="button"
        onClick={() => onRemove()}
        className="z-10 bg-white rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-1 border-[3px] border-foreground"
      >
        <XIcon className="w-4 h-4 stroke-[3px]" />
      </button>
      <div className="w-full h-full absolute group:hover:bg-white-100/50" />
      <img src={url}
        className="rounded-md w-full h-full object-cover"
        alt={file.name} />
    </div>
  )
}
