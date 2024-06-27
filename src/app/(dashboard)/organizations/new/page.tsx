import { redirect } from 'next/navigation'
import React from 'react'

import { auth } from '@/auth/auth'
import { Container } from '@/components/container'
import { Separator } from '@/components/ui/separator'

import { NewOrganizationForm } from './_components/new-organization-form'

const NewOrganizationPage = async () => {
  const { user } = await auth()

  if (!user) redirect('/auth/sign-in')

  return (
    <Container otherClasses="mt-4">
      <h1 className="text-xl font-semibold">Criar uma nova organização</h1>
      <p className="text-sm text-muted-foreground">
        Preencha todos os campos para criar uma organização.
      </p>

      <Separator className="my-4" />

      <NewOrganizationForm />
    </Container>
  )
}

export default NewOrganizationPage
