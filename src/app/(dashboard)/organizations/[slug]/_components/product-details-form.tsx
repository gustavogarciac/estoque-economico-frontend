'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'

const detailsFormSchema = z.object({
  code: z.string(),
  stock: z.string(),
  categoryId: z.string(),
  author: z.string(),
})

type DetailsFormSchemaType = z.infer<typeof detailsFormSchema>

interface ProductDetailsFormProps {
  product: Product
  organizationCategories: Category[]
}

export const ProductDetailsForm = ({
  product,
  organizationCategories,
}: ProductDetailsFormProps) => {
  const router = useRouter()
  const form = useForm<DetailsFormSchemaType>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      code: product.code,
      stock: String(product.stock),
      categoryId: product.category.id,
      author: product.author.name,
    },
  })

  async function handleUpdateProduct(data: DetailsFormSchemaType) {
    try {
      const { categoryId, code, stock } = data

      await api.put(
        `/organizations/${product.organizationId}/products/${product.id}`,
        {
          code,
          stock: Number(stock),
          categoryId,
        },
      )

      router.refresh()

      toast({
        title: 'Produto atualizado com sucesso!',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Erro ao atualizar produto',
        description:
          'Ocorreu um erro ao tentar atualizar o produto. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateProduct)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Código identificador do produto"
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
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Quantidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Categoria</FormLabel>
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
                    {organizationCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Registrado por</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Autor do registro" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex flex-col gap-2">
          <Label htmlFor="registered-at-update-input">Registrado em</Label>
          <Input
            id="registered-at-update-input"
            disabled
            value={formatDistanceToNow(product.registeredAt, {
              addSuffix: true,
              locale: ptBR,
            })}
          />
        </div>

        <div className="flex w-full justify-end gap-4 pt-4">
          <DialogClose asChild>
            <Button className="w-1/4" variant={'destructive'} size="sm">
              Fechar
            </Button>
          </DialogClose>
          <Button
            className="w-1/4"
            variant={'secondary'}
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span>
                Atualizando...{' '}
                <LoaderIcon className="ml-2 size-4 animate-spin" />
              </span>
            ) : (
              'Atualizar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
