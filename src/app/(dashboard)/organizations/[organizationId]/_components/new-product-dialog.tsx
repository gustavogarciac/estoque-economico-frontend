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
import { api } from '@/lib/axios'

import { NewProductForm } from './new-product-form'

interface NewProductDialogProps {
  organizationId: string
  userId: string
}

async function fetchCategories(organizationId: string) {
  const categories = await api.get<Category[]>(
    `/organizations/${organizationId}/categories`,
  )

  return categories.data
}

export const NewProductDialog = async ({
  organizationId,
  userId,
}: NewProductDialogProps) => {
  const categories = await fetchCategories(organizationId)

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

        <NewProductForm
          categories={categories}
          userId={userId}
          organizationId={organizationId}
        />
      </DialogContent>
    </Dialog>
  )
}
