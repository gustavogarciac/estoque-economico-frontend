'use client'

import { Loader2, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useMemo, useState } from 'react'

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

export const NewCategoryDialog = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const imageUrlPreview = useMemo(() => {
    if (!imageFile) {
      return null
    }

    return URL.createObjectURL(imageFile)
  }, [imageFile])

  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const selectedFile = files[0]
    setImageFile(selectedFile)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!name) {
        throw new Error('O campo nome é obrigatório.')
      }

      toast({
        title: 'Categoria criada!',
        description: `A categoria ${name} foi criada com sucesso!`,
        variant: 'success',
      })
    } catch (error) {
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
        <Button>
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
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="input-code-new-product">Descrição</Label>
            <Textarea
              placeholder="Adicione uma descrição detalhada sobre a categoria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="textarea-description-new-category"
              className="resize-none"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <Label htmlFor="input-image-url-new-category">Imagem</Label>
              <Input
                type="file"
                id="input-image-url-new-category"
                accept="images/*"
                onChange={handleFileSelected}
              />
            </div>
            {imageUrlPreview && (
              <Image
                src={imageUrlPreview}
                width={100}
                height={100}
                alt=""
                className="aspect-square rounded-full object-cover"
              />
            )}
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
