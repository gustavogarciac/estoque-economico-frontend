import { ContainerIcon } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { SignInForm } from './_components/sign-in-form'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Insira suas credenciais para continuar acessando a plataforma.',
}

const SignInPage = () => {
  return (
    <Card className="min-w-80 max-w-96">
      <CardHeader className="items-center gap-2">
        <ContainerIcon className="size-9" />
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Insira suas credenciais para continuar acessando a plataforma.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}

export default SignInPage
