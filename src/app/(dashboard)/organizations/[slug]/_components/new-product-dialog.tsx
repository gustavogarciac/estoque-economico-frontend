import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { getOrganizationCategories } from '@/http/get-categories'

import { NewProductForm } from './new-product-form'

interface NewProductDialogProps {
  orgSlug: string
}

export const NewProductDialog = async ({ orgSlug }: NewProductDialogProps) => {
  const categories = await getOrganizationCategories(orgSlug)

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

        <NewProductForm categories={categories} orgSlug={orgSlug} />
      </DialogContent>
    </Dialog>
  )
}
