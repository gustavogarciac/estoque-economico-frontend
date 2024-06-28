'use client'

import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

import { createCategoryAction } from '../actions'

interface NewCategoryDialogProps {
  orgSlug: string
  triggerClasses?: string
  cardTrigger?: boolean
}

const newCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' }),
  description: z
    .string()
    .min(2, { message: 'Crie uma breve descrição para a categoria.' }),
  imageUrl: z.string().url(),
})

export type NewCategorySchemaType = z.infer<typeof newCategorySchema>

export const NewCategoryDialog = ({
  triggerClasses,
  cardTrigger = false,
  orgSlug,
}: NewCategoryDialogProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<NewCategorySchemaType>({
    defaultValues: {
      name: '',
      description: '',
      imageUrl: faker.image.avatarGitHub(),
    },
    resolver: zodResolver(newCategorySchema),
  })

  async function handleSubmit(data: NewCategorySchemaType) {
    startTransition(async () => {
      const state = await createCategoryAction({ orgSlug, data })

      if (state.success === true) {
        toast({
          title: 'Categoria criada com sucesso!',
          description: `A categoria ${data.name} foi criada com sucesso!`,
          variant: 'success',
        })
        form.reset()
        router.refresh()
      } else {
        toast({
          title: 'Erro ao criar categoria',
          description: state.message,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(triggerClasses)}
          variant={cardTrigger ? 'ghost' : 'default'}
        >
          <PlusIcon className="mr-2 size-4" /> Nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <div className="pt-2">
            <Separator />
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              Adicione todos os detalhes para criar uma nova categoria.
            </p>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome <strong className="text-red-500">*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o nome identificador da sua categoria."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Crie uma breve descrição sobre o produto."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="sm"
                className="self-end"
                type="button"
                variant="ghost"
                onClick={() =>
                  form.setValue('description', faker.lorem.paragraph())
                }
              >
                Gerar descrição aleatória
              </Button>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Image
                src={form.watch('imageUrl')}
                width={100}
                height={100}
                alt=""
                className="rounded-full"
              />
              <Button
                type="button"
                id="input-image-url-new-category"
                variant="ghost"
                size="sm"
                onClick={() =>
                  form.setValue('imageUrl', faker.image.avatarGitHub())
                }
              >
                Gerar nova imagem
              </Button>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={'destructive'} size="sm">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="secondary"
                size="sm"
                disabled={isPending}
                className="w-16"
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  'Criar'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
