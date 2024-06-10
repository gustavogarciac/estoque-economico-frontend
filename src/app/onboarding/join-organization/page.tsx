import { ContainerIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { JoinOrganizationComboBox } from './_components/join-organization-combobox'

const JoinOrganizationPage = () => {
  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader>
        <ContainerIcon className="mx-auto size-8" />
        <CardTitle className="text-center">
          Participar de uma organização
        </CardTitle>
        <CardDescription className="mt-2">
          Pesquise a organização a qual você deseja fazer parte e solicite a sua
          participação.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="mt-4">
        <JoinOrganizationComboBox />
      </CardContent>
    </Card>
  )
}

export default JoinOrganizationPage
