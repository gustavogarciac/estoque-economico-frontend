'use client'

import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { IterationCcw, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { updateCategoryAction } from '../actions'

interface CategoryDetailsFormProps {
  orgSlug: string
  category: Category
}

const categoryDetailsSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' }),
  description: z
    .string()
    .min(2, { message: 'Crie uma breve descrição para a categoria.' }),
  imageUrl: z.string(),
})

export type CategoryDetailsSchemaType = z.infer<typeof categoryDetailsSchema>

export const CategoryDetailsForm = ({
  orgSlug,
  category,
}: CategoryDetailsFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [categoryImage, setCategoryImage] = useState<string>(
    category.imageUrl || faker.image.avatarGitHub(),
  )

  const router = useRouter()

  const form = useForm<CategoryDetailsSchemaType>({
    defaultValues: {
      name: category.name,
      description: category.description ?? '',
      imageUrl: category.imageUrl ?? faker.image.avatarGitHub(),
    },
    resolver: zodResolver(categoryDetailsSchema),
  })

  async function handleSubmit(data: CategoryDetailsSchemaType) {
    startTransition(async () => {
      const state = await updateCategoryAction({
        slug: orgSlug,
        data,
        categoryId: category.id,
      })

      if (state.success === true) {
        toast({
          title: 'Categoria atualizada com sucesso!',
          description: `A categoria ${data.name} foi atualizada com sucesso!`,
          variant: 'success',
        })

        router.refresh()
      } else {
        toast({
          title: 'Erro ao atualizar categoria',
          description: state.message,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2"
      >
        <div className="flex flex-col gap-3">
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição da categoria</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira uma breve descrição sobre a categoria."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="group relative grid w-fit items-center rounded-lg">
            <Image
              src={categoryImage}
              alt={category.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <Button
              className="absolute hidden h-[120px] w-[120px] items-center justify-center rounded-full group-hover:flex group-hover:bg-zinc-950/50"
              size="icon"
              variant={'ghost'}
              onClick={() => setCategoryImage(faker.image.avatarGitHub())}
              type="button"
            >
              <IterationCcw className="size-12 font-bold text-zinc-50" />
              <span className="sr-only">Alterar imagem da categoria</span>
            </Button>
          </div>
          <span className="text-4xl font-semibold">Imagem</span>
        </div>

        <div className="col-span-2 flex w-full">
          <Button className="mr-auto">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Salvar categoria'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
