import { useGetAsset } from "@/lib/hooks/asset";
import MailInterface from "@/lib/interfaces/mail";
import { DownloadIcon, PaperclipIcon } from "lucide-react";

export function MailBody({ mail }: { mail: MailInterface.MailSent.Fetch }) {
  return (
    <div className="flex flex-col grow justify-between">
      <div>
        {mail.data.body}
      </div>
      <div className="flex gap-4 flex-wrap">
        {mail.data.attachments.map(attachment => <BodyAttachment attachment={attachment} />)}
      </div>
    </div>
  )
}

function BodyAttachment({ attachment }: { attachment: MailInterface.MailAttachment }) {
  if (attachment.type === "file")
    return (
      <a
        href={attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-lg relative border-foreground border-[3px] rounded-lg w-40 aspect-square overflow-hidden select-none"
      >
        <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-between text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span />
          <span className="flex justify-end p-4">
            <DownloadIcon className="w-6 h-6 stroke-[3px]" />
          </span>
        </span>
        <PaperclipIcon
          className="p-8 w-full h-full"
        />
        <div className="absolute w-full h-full top-0 left-0" style={{ boxShadow: "inset 1px 60px 15px 0px rgba(0,0,0,0.6)" }} />
        <span className="absolute z-10 h-full w-full top-0 left-0">
          <span className="flex justify-between items-center p-4">
            <span className="font-semibold text-white text-lg select-none">
              attachment
            </span>
          </span>
        </span>
      </a>
    )

  return <AssetAttachment assetId={attachment.assetId} />
}

function AssetAttachment({ assetId }: { assetId: string }) {
  const { isLoading, isError, data: asset } = useGetAsset(assetId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!asset) return null

  return (
    <a
      href={asset.data.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-lg relative border-foreground border-[3px] rounded-lg w-40 aspect-square overflow-hidden select-none"
    >
      <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-between text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span />
        <span className="flex justify-end p-4">
          <DownloadIcon className="w-6 h-6 stroke-[3px]" />
        </span>
      </span>
      <img alt={asset.data.name} className="w-full h-full object-cover select-none"
        src={asset.data.downloadUrl} />
      <div className="absolute w-full h-full top-0 left-0" style={{ boxShadow: "inset 1px 60px 15px 0px rgba(0,0,0,0.6)" }} />
      <span className="absolute z-10 h-full w-full top-0 left-0">
        <span className="flex justify-between items-center p-4">
          <span className="font-semibold text-white text-lg select-none">
            {asset.data.name}
          </span>
        </span>
      </span>
    </a >
  )
}
