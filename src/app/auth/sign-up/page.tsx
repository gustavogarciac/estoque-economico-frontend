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

import { SignUpForm } from './_components/sign-up-form'

export const metadata: Metadata = {
  title: 'Cadastro',
  description:
    'Preencha os campos para realizar o seu cadastro e continuar acessando a plataforma.',
}

const SignUpPage = () => {
  return (
    <Card className="min-w-80 max-w-96">
      <CardHeader className="items-center gap-2">
        <ContainerIcon className="size-9" />
        <CardTitle>Cadastro</CardTitle>
        <CardDescription>
          Preencha os campos para realizar o seu cadastro e continuar acessando
          a plataforma.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}

export default SignUpPage
