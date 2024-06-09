'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
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

const signUpFormSchema = z
  .object({
    name: z
      .string({ message: 'Insira o seu nome' })
      .min(4, { message: 'O nome deve ter no mínimo 4 caracteres' })
      .max(255, { message: 'O nome deve ter no máximo 255 caracteres' }),
    email: z.string().email({ message: 'Insira um e-mail válido' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string().min(6, {
      message: 'A confirmação da senha deve ter no mínimo 6 caracteres',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não conferem',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignUp(data: SignUpFormSchemaType) {
    try {
      await api.post('/users', {
        email: data.email,
        name: data.name,
        password: data.password,
      })

      toast({
        title: 'Sucesso!',
        description: 'Você realizou o seu cadastro com sucesso!',
        variant: 'success',
      })

      await new Promise((resolve) => setTimeout(resolve, 5000))
      router.push('/auth/sign-in')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: 'Erro!',
            description: 'O e-mail informado já está em uso.',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Erro!',
          description: 'Ocorreu um erro ao realizar o cadastro.',
          variant: 'destructive',
        })
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o seu nome!"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o seu e-mail de acesso"
                  {...field}
                  autoComplete="off"
                />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita a senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme a senha."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="flex flex-row items-center gap-1 text-sm">
          Já possui uma conta?{' '}
          <Link href="/auth/sign-in" className="hover:underline">
            Entrar
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
              <span>Cadastrando...</span>
            </>
          ) : (
            'Realizar cadastro'
          )}
        </Button>
      </form>
    </Form>
  )
}
