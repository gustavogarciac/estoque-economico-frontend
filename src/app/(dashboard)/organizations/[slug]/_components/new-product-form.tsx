'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, PlusIcon } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { createProductAction } from '../actions'

interface NewProductFormProps {
  orgSlug: string
  categories: Category[]
}

const newProductFormSchema = z.object({
  code: z.string().min(1, { message: 'O código não pode ser vazio.' }),
  stock: z
    .string()
    .min(1, { message: 'Por favor, informe corretamente o estoque.' }),
  categoryId: z.string().min(1, { message: 'Selecione uma categoria.' }),
  description: z.string().optional(),
  name: z.string().optional(),
})

export type ProductFormType = z.infer<typeof newProductFormSchema>

export const NewProductForm = ({
  orgSlug,
  categories,
}: NewProductFormProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<ProductFormType>({
    resolver: zodResolver(newProductFormSchema),
    defaultValues: {
      code: '',
      stock: '',
      categoryId: '',
      description: '',
      name: '',
    },
  })

  async function handleSubmitForm(data: ProductFormType) {
    startTransition(async () => {
      const state = await createProductAction(orgSlug, data)

      if (state.success === true) {
        toast({
          title: 'Produto criado com sucesso!',
          description:
            'O registro deste produto foi salvo com sucesso, você pode acessá-lo na página principal.',
          variant: 'success',
        })

        form.resetField('code')
        form.resetField('stock')
        form.resetField('name')
        form.resetField('description')
        router.refresh()
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
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-4"
      >
        <p className="text-sm text-muted-foreground">
          Adicione todos os detalhes para criar um novo registro de produto.
        </p>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Código <strong className="text-red-500">*</strong>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o código identificador do seu produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 items-center gap-2">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  Quantidade <strong className="text-red-500">*</strong>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Informe o estoque" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Categoria <strong className="text-red-500">*</strong>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value !== '' ? (
                        <SelectValue placeholder="Selecione uma categoria" />
                      ) : (
                        <span>Selecione uma categoria</span>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <Button
                        asChild
                        size="sm"
                        variant="secondary"
                        className="w-full"
                      >
                        <Link href={`/organizations/${orgSlug}/categories`}>
                          <PlusIcon className="mr-2 size-4" /> Nova categoria
                        </Link>
                      </Button>
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="Insira o nome do produto" {...field} />
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

        <Button type="submit" className="self-end" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            'Criar registro'
          )}
        </Button>
      </form>
    </Form>
  )
}
