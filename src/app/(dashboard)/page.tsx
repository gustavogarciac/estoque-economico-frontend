import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'

import { getUserOrganizations } from '@/actions/get-user-organizations'
import { Container } from '@/components/container'
import { OrganizationCard } from '@/components/organization-card'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const Home = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const organizations = await getUserOrganizations()

  return (
    <Container otherClasses="mt-4">
      <h1 className="text-xl leading-relaxed">Escolha a organização.</h1>
      <p className="text-muted-foreground">
        Selecione a organização que deseja gerenciar.
      </p>

      <Separator className="my-4" />

      <div className="grid grid-cols-4 gap-3">
        {organizations?.map((organization) => (
          <OrganizationCard key={organization.id} organization={organization} />
        ))}

        <Card className="flex min-h-[130px] items-center justify-center border-dashed p-0">
          <Link
            href="/organizations/new"
            className="group flex h-full w-full items-center justify-center rounded-lg bg-muted/10 p-4 transition-all duration-300 ease-in-out hover:bg-muted/20"
          >
            <span className="text-primary">Criar nova organização</span>
            <PlusCircleIcon className="ml-2 size-6 text-primary" />
          </Link>
        </Card>
      </div>
    </Container>
  )
}

export default Home
