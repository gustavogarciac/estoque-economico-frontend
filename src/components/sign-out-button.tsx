'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { signOut } from '@/actions/sign-out'

import { Button } from './ui/button'
import { toast } from './ui/use-toast'

export const SignOutButton = () => {
  const router = useRouter()

  async function handleSignOut() {
    try {
      await signOut()

      toast({
        title: 'Você saiu da plataforma',
        description: 'Você foi desconectado da plataforma com sucesso!',
      })

      router.push('/auth/sign-in')
    } catch (error) {
      toast({
        title: 'Erro ao sair da plataforma',
        description:
          'Ocorreu um erro ao tentar sair da plataforma, tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      size="sm"
      className="w-full justify-start p-1.5"
      variant="ghost"
    >
      Sair da plataforma
    </Button>
  )
}
