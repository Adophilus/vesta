import { useGetAsset } from "@/lib/hooks/asset";
import MailInterface from "@/lib/interfaces/mail";

export function MailBody({ mail }: { mail: MailInterface.MailSent.Fetch }) {
  return (
    <div className="flex flex-col grow justify-between">
      <div>
        {mail.data.body}
      </div>
      <div className="flex flex-col gap-4">
        {mail.data.attachments.map(attachment => <BodyAttachment attachment={attachment} />)}
      </div>
    </div>
  )
}

function BodyAttachment({ attachment }: { attachment: MailInterface.MailAttachment }) {
  if (attachment.type === "file")
    return (
      <div>
        <a href={attachment.url}>
          {attachment.url}
        </a>
      </div>
    )

  return <AssetAttachment assetId={attachment.assetId} />
}


function AssetAttachment({ assetId }: { assetId: string }) {
  const { isLoading, isError, data: asset } = useGetAsset(assetId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!asset) return null

  return (
    <div className="border-lg border-foreground border-[3px] p-4">
      <div className="flex justify-between items-center">
        <header className="font-semibold">
          {asset.data.name}
        </header>
        <span className="text-muted-foreground text-xs">
          {asset.data.type}
        </span>
      </div>
    </div>
  )
}
