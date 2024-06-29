'use client'

import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleHelpIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
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

import {
  onboardingCreateOrganizationAction,
  onboardUserAction,
} from '../actions'

const organizationFormSchema = z.object({
  name: z.string().min(2),
  domain: z.string(),
  shouldAttachUsersByDomain: z.boolean().default(false),
  description: z.string(),
  imageUrl: z.string(),
})

export type OrganizationFormValues = z.infer<typeof organizationFormSchema>

export const OnboardingNewOrganizationForm = () => {
  const [isPending, startTransition] = useTransition()
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
    },
  })

  async function submitOrganizationCreation(data: OrganizationFormValues) {
    startTransition(async () => {
      await handleCreateOrganizationAndOnboardUser(data)
    })
  }

  async function handleCreateOrganizationAndOnboardUser(
    data: OrganizationFormValues,
  ) {
    const {
      success: createOrganizationSuccess,
      message: createOrganizationMessage,
    } = await onboardingCreateOrganizationAction(data)

    const { success: onboardUserSuccess, message: onboardUserMessage } =
      await onboardUserAction()

    if (createOrganizationSuccess && onboardUserSuccess) {
      toast({
        title: 'Organização criada com sucesso!',
        description: 'Seja bem-vindo ao seu novo espaço de trabalho.',
        variant: 'success',
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/api/onboarding/next')
    } else {
      if (createOrganizationMessage) {
        return toast({
          title: 'Erro ao criar organização',
          description: createOrganizationMessage,
          variant: 'destructive',
        })
      }

      if (onboardUserMessage) {
        return toast({
          title: 'Erro ao concluir onboarding',
          description: onboardUserMessage,
          variant: 'destructive',
        })
      }

      return toast({
        title: 'Erro ao criar organização',
        description:
          'Não foi possível criar a organização. Tente novamente mais tarde.',
        variant: 'destructive',
      })
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
                <FormLabel>
                  Nome<strong className="text-destructive">*</strong>
                </FormLabel>
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
          disabled={isPending || !form.formState.isValid}
          className="mt-4 self-end"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <span>Criar organização</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
