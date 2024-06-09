'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { setCookie } from 'cookies-next'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type SignInFormSchemaType = z.infer<typeof signInFormSchema>

type HandleSignInResponse = {
  token: string
}

export const SignInForm = () => {
  const router = useRouter()
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: SignInFormSchemaType) {
    try {
      const response = await api.post<HandleSignInResponse>(
        '/sessions/password',
        {
          email: data.email,
          password: data.password,
        },
      )

      toast({
        title: 'Sucesso!',
        description: 'Você foi autenticado com sucesso.',
        variant: 'success',
      })

      setCookie('token', response.data.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast({
            title: 'Erro!',
            description: 'Usuário não encontrado.',
            variant: 'destructive',
          })
        }

        if (error.response?.status === 400) {
          return toast({
            title: 'Erro!',
            description: 'E-mail ou senha incorretos.',
            variant: 'destructive',
          })
        }
      } else {
        return toast({
          title: 'Erro!',
          description: 'Ocorreu um erro inesperado.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
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

        <span className="flex flex-row items-center gap-1 text-sm">
          Ainda não possui um cadastro?{' '}
          <Link href="/auth/sign-up" className="hover:underline">
            Clique aqui.
          </Link>
        </span>

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
