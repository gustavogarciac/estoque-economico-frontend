'use client'

import { faker } from '@faker-js/faker'
import { AxiosError } from 'axios'
import { Loader2, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

interface NewCategoryDialogProps {
  organizationId: string
  triggerClasses?: string
  cardTrigger?: boolean
}

export const NewCategoryDialog = ({
  triggerClasses,
  cardTrigger = false,
  organizationId,
}: NewCategoryDialogProps) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState(faker.image.avatarGitHub())
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!name) {
        throw new Error('O campo nome é obrigatório.')
      }

      await api.post(`/categories/${organizationId}`, {
        name,
        description,
        imageUrl,
      })

      router.refresh()

      toast({
        title: 'Categoria criada!',
        description: `A categoria ${name} foi criada com sucesso!`,
        variant: 'success',
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: error.response.data.message,
            description: 'O campo nome é obrigatório.',
            variant: 'destructive',
          })
        }
      }

      toast({
        title: 'Erro ao criar categoria',
        description: 'Ocorreu um erro ao tentar criar uma nova categoria.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Adicione todos os detalhes para criar uma nova categoria.
          </p>

          <div className="space-y-1">
            <Label htmlFor="input-name-new-category">Nome</Label>
            <Input
              id="input-name-new-category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome de identificação da categoria"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="input-code-new-product">Descrição</Label>
            <Textarea
              placeholder="Adicione uma descrição detalhada sobre a categoria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="textarea-description-new-category"
              className="resize-none"
            />
            <Button
              size="sm"
              className="self-end"
              type="button"
              variant="ghost"
              onClick={() => setDescription(faker.commerce.productDescription)}
            >
              Gerar descrição aleatória
            </Button>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Image
              src={imageUrl}
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
              onClick={() => setImageUrl(faker.image.avatarGitHub())}
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
