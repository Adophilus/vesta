import MailInterface from "@/lib/interfaces/mail";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FullLoader } from "../full-loader";
import { useGetMailSenderProfile } from "../hooks/mail";

export function MailSenderProfile({ mail }: { mail: MailInterface.MailSent.Fetch }) {
  const { isLoading, isError, data, error } = useGetMailSenderProfile(mail)

  if (isLoading)
    return (
      <Avatar>
        <AvatarImage>
          <FullLoader />
        </AvatarImage>
      </Avatar>
    )

  console.log(data)
  const profileIniitals = data ? data.firstName[0] + data.lastName[0] : null

  return (
    <Avatar>
      <AvatarFallback>
        profileIniitals
      </AvatarFallback>
    </Avatar>
  )
}
