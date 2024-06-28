import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const MetricsPage = async ({
  params,
}: {
  params: { organizationId: string }
}) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const { organizationId } = params

  if (!organizationId) redirect('/')

  return (
    <Container>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Card className="group flex min-h-[200px] flex-col items-center justify-center p-0">
          <CardHeader>
            <CardTitle className="">Inventário de produtos</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="flex flex-col gap-2">
            <p className="pt-3 text-sm text-muted-foreground">
              Aqui você pode ver o inventário de produtos registrados e suas
              devidas quantidades.
            </p>

            <Button asChild size="sm" variant="outline" className="self-end">
              <Link href={`/organizations/${organizationId}/metrics/inventory`}>
                Ver inventário
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group flex min-h-[200px] flex-col items-center justify-center p-0">
          <CardHeader>
            <CardTitle className="">Produtos recorrentes</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="flex flex-col gap-2">
            <p className="pt-3 text-sm text-muted-foreground">
              Veja os produtos que mais obtiveram registros dentre uma data
              estabelecida.
            </p>

            <Button asChild size="sm" variant="outline" className="self-end">
              <Link href={`/organizations/${organizationId}/metrics/featured`}>
                Ver produtos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

export default MetricsPage
