'use client'

import { faker } from '@faker-js/faker'
import { Loader2, PlusIcon } from 'lucide-react'
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

interface NewProductDialogProps {
  organizationId: string
}

export const NewProductDialog = ({ organizationId }: NewProductDialogProps) => {
  const [code, setCode] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!code || !quantity || !category) {
        throw new Error('Todos os campos são obrigatórios.')
      }

      toast({
        title: 'Registro criado!',
        description: 'O registro foi criado com sucesso.',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Erro ao criar registro',
        description:
          'Ocorreu um erro ao tentar criar um novo registro de produto.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-3" /> Novo registro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Registro</DialogTitle>
          <div className="pt-2">
            <Separator />
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Adicione todos os detalhes para criar um novo registro de produto.
          </p>

          <div className="space-y-1">
            <Label htmlFor="input-code-new-product">Código</Label>
            <Input
              id="input-code-new-product"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de identificação do produto"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="input-quantity-new-product">Quantidade</Label>
              <Input
                id="input-quantity-new-product"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Informe a quantidade do produto."
              />
            </div>
            <div className="col-span-3 space-y-1">
              <Label htmlFor="select-category-new-product">Categoria</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger
                  className="w-full"
                  id="select-category-new-product"
                  aria-placeholder="Selecione uma categoria"
                >
                  <SelectValue
                    className="text-sm text-muted-foreground placeholder:text-muted-foreground"
                    placeholder="Selecione uma categoria"
                  >
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

          <div className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant={'destructive'} size="sm">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="secondary"
              size="sm"
              disabled={isSubmitting}
              className="w-16"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Criar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
