'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const SignUpForm = () => {
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignUp(data: SignUpFormSchemaType) {
    try {
      const response = await api.post('/sessions/password', {
        email: data.email,
        password: data.password,
      })

      console.log(response.data)

      toast({
        title: 'Sucesso!',
        description: 'Você foi autenticado com sucesso.',
        variant: 'success',
      })

      console.log(data)
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao autenticar o usuário.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="mt-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Insira o seu e-mail de acesso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Insira a sua senha de acesso"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-4 self-end"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="mr-1 inline-block size-4 animate-spin" />
              <span>Acessando...</span>
            </>
          ) : (
            'Acessar a plataforma'
          )}
        </Button>
      </form>
    </Form>
  )
}
