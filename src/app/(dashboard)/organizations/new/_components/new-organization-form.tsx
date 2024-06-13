'use client'

import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { CircleHelpIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'

const organizationFormSchema = z.object({
  name: z.string(),
  domain: z.string().nullable(),
  shouldAttachUsersByDomain: z.boolean().default(false),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  ownerId: z.string(),
})

type OrganizationFormValues = z.infer<typeof organizationFormSchema>

interface NewOrganizationFormProps {
  userId: string
}

interface SubmitOrganizationCreationResponse {
  organizationId: string
}

export const NewOrganizationForm = ({ userId }: NewOrganizationFormProps) => {
  const router = useRouter()
  const [organizationImage, setOrganizationImage] = useState(
    faker.image.avatarGitHub(),
  )

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: '',
      domain: '',
      shouldAttachUsersByDomain: false,
      description: '',
      imageUrl: organizationImage,
      ownerId: '',
    },
  })

  async function submitOrganizationCreation(data: OrganizationFormValues) {
    try {
      const response = await api.post<SubmitOrganizationCreationResponse>(
        '/organizations',
        {
          name: data.name,
          domain: data.domain,
          description: data.description,
          imageUrl: data.imageUrl,
          shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
          ownerId: userId,
        },
      )

      toast({
        title: 'Sucesso!',
        description: `Organização ${data.name} com sucesso.`,
        variant: 'success',
      })

      form.reset()
      router.push(`/organizations/${response.data.organizationId}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: 'Erro!',
            description: 'Já existe uma organização com essas credenciais!',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Erro!',
            description: 'Ocorreu um erro ao criar a organização.',
            variant: 'destructive',
          })
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitOrganizationCreation)}
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o nome da sua organização"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="domain"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domínio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o domínio da sua organização"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Insira uma breve descrição da sua organização"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="shouldAttachUsersByDomain"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-end gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex items-center gap-1 text-muted-foreground">
                Adicionar usuários com o domínio da sua organização{' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="ml-2 size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-80 text-muted-foreground">
                        Ao ativar essa opção, todos os usuários que se
                        registrarem com o domínio da sua organização serão
                        automaticamente adicionados a ela.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex flex-row items-center gap-3">
          <Image
            src={organizationImage}
            alt=""
            width={60}
            height={60}
            className="rounded-full"
          />
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              const imageUrl = faker.image.avatarGitHub()
              form.setValue('imageUrl', imageUrl)
              setOrganizationImage(imageUrl)
            }}
          >
            Alterar imagem
          </Button>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          className="mt-4 self-end"
        >
          Criar organização
        </Button>
      </form>
    </Form>
  )
}
