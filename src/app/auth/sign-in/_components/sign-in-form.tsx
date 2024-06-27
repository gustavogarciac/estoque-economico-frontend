'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
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

import { signInAction } from '../../actions'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: SignInFormSchemaType) {
    startTransition(async () => {
      const state = await signInAction(data)

      if (state.success === true) {
        toast({
          title: 'Autenticação realizada com sucesso!',
          description: 'Você será redirecionado para a página inicial.',
          variant: 'success',
        })

        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push('/')
      } else {
        toast({
          title: 'Ocorreu um erro!',
          description: state.message,
          variant: 'destructive',
        })
      }
    })
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

        <span className="flex flex-row items-center gap-1 text-sm">
          Ainda não possui um cadastro?{' '}
          <Link href="/auth/sign-up" className="hover:underline">
            Clique aqui.
          </Link>
        </span>

        <Button
          type="submit"
          className="mt-4 w-1/3 self-end"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <LoaderCircle className="mr-1 inline-block size-4 animate-spin" />
            </>
          ) : (
            'Acessar'
          )}
        </Button>
      </form>
    </Form>
  )
}
