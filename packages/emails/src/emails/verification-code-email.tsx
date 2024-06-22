import {
   Head,
   Html,
   Img,
   Preview,
   Section,
   Text,
} from "@react-email/components"
import { EmailBody } from "../emails/shared"
import { withBaseUrl } from "../utils"

export function VerificationCodeEmail({
   verificationCode,
}: {
   verificationCode: string
}) {
   return (
      <Html>
         <Head />
         <Preview>Acme verification code</Preview>
         <EmailBody>
            <Section className="mt-[12px]">
               <Img
                  src={withBaseUrl("/logo.png")}
                  width="42"
                  height="42"
                  alt="Acme"
                  className="my-0"
               />
            </Section>

            <Text className="mx-0 my-[30px] p-0 font-normal text-[24px] text-black">
               Your Acme verification code
            </Text>

            <Text className="font-bold text-[28px] text-black leading-[24px] tracking-widest">
               {verificationCode}
            </Text>
            <Text className="text-[14px] text-gray-700 leading-[24px]">
               The code will expire in 15 minutes.
            </Text>
         </EmailBody>
      </Html>
   )
}
