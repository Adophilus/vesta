import { ScrollArea } from "@/components/shad/ui/scroll-area"
import { FunctionComponent } from "react"
import MailInterface from "@/lib/interfaces/mail"
import { useMailFolder } from "../hooks/mail"
import { InboxIcon } from "lucide-react"
import { Item } from "./item"
import * as utils from "../utils"

export const MailList: FunctionComponent<{ mails: MailInterface.MailReceived.Fetch[] }> = ({ mails }) => {
  const mailFolder = useMailFolder()

  const filteredMails = utils.filterMailsReceived(mails, mailFolder)

  if (filteredMails.length === 0)
    return (
      <div className="grow gap-4 flex justify-center items-center flex-col">
        <InboxIcon className="h-12 w-12 mx-auto text-muted-foreground" />
        <header className="text-center text-muted-foreground">
          No mail found
        </header>
      </div>
    )

  return (
    <ScrollArea className="grow flex flex-col">
      {filteredMails.map((mail) => (
        <div className="flex flex-col gap-2 p-4 pt-0">
          <Item key={mail.key} mail={mail} />
        </div>
      ))}
    </ScrollArea>
  )
}

