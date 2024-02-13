import { Separator } from "@/components/shad/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shad/ui/tabs"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MailList } from "./-components/list"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/shad/ui/input"

import { Layout } from "./_$mailFolder/-components/layout"
import { useGetMailsReceived, useMailFolder } from "./-components/hooks/mail"
import { FullLoader } from "./-components/full-loader"
import { useEffect, useState } from "react"
import MailInterface from "@/lib/interfaces/mail"
import { capitalize } from "lodash"
import { Search } from "./-components/search"
import { z } from 'zod'
import * as utils from "./-components/utils"

const searchParamsSchema = z.object({
  filter: z.string().optional()
})

export const Route = createFileRoute('/_mail/mail/_$mailFolder')({
  component: MailFolderLayout,
  validateSearch: (search) => searchParamsSchema.parse(search),
  loader: ({ params }) => ({
    mailFolder: params.mailFolder.toUpperCase() as unknown as MailInterface.MailFolder
  })
})

function MailFolderLayout() {
  const { mailFolder } = Route.useLoaderData()
  const { isLoading, isError, data } = useGetMailsReceived()
  const [tab, setTab] = useState<"all" | "unread">()
  const isTabbable = ["INBOX", "SPAM", "ARCHIVE", "IMPORTANT", "TRASH"].includes(mailFolder)

  const mails = data ?
    isTabbable
      ? tab === "unread"
        ? data.filter(mail => !mail.data.isRead)
        : data
      : data
    : data

  return (
    <Layout sidepanel={<Outlet />}>
      <Tabs
        defaultValue="all"
        className="grow flex flex-col"
      >
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">
            {capitalize(mailFolder)}
          </h1>
          {isTabbable && (
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                onClick={() => setTab("all")}
                className="text-zinc-600 dark:text-zinc-200"
              >
                All mail
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setTab("unread")}
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <Separator />
        <Search />
        <div
          className="m-0 grow flex flex-col"
        >
          {isLoading && <FullLoader />}
          {isError && <div>Error</div>}
          {mails && (
            <MailList
              mails={mails}
            />
          )}
        </div>
      </Tabs>
    </Layout>
  )
}
