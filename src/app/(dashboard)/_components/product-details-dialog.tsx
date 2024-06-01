'use client'

import { faker } from '@faker-js/faker'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Ellipsis } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { ProductData } from '@/constants/fake-product-data'

interface ProductDetailsDialogProps {
  product: ProductData
}

export const ProductDetailsDialog = ({
  product,
}: ProductDetailsDialogProps) => {
  const [code, setCode] = useState(product.code)
  const [quantity, setQuantity] = useState(product.quantity)
  const [category, setCategory] = useState(product.category)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Product updated:', { code, quantity, category })
      toast({
        title: 'Registro atualizado!',
        description: 'O registro foi atualizado com sucesso.',
        variant: 'success',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Detalhes do produto</span>
          <Ellipsis className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do produto</DialogTitle>

          <div className="py-2">
            <Separator />
          </div>
        </DialogHeader>

        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-1 ">
            <Label htmlFor="input-code-details">Código</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              id="input-code-details"
            />
          </div>

          <div className="grid grid-cols-5 gap-4 ">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="input-code-details">Quantidade</Label>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                id="input-quantity-details"
              />
            </div>
            <div className="col-span-3 space-y-1">
              <Label htmlFor="select-category-details">Categoria</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full" id="select-category-details">
                  <SelectValue className="text-sm text-muted-foreground">
                    {category}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">
                    {faker.commerce.department()}
                  </SelectItem>
                  <SelectItem value="random1">
                    {faker.commerce.department()}
                  </SelectItem>
                  <SelectItem value="random2">
                    {faker.commerce.department()}
                  </SelectItem>
                  <SelectItem value="random3">
                    {faker.commerce.department()}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="input-author-details">Autor:</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                value={product.author}
                disabled
                id="input-author-details"
                className="col-span-2"
              />
              <Input
                value="Administrador"
                disabled
                id="input-author-details"
                className="col-span-1"
              />
            </div>
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="input-registered-at-details">Registrado em:</Label>
            <Input
              value={formatDistanceToNow(new Date(product.registeredAt), {
                addSuffix: true,
                locale: ptBR,
              })}
              disabled
              id="input-registered-at-details"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
