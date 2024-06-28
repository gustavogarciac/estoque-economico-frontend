import { Ellipsis } from 'lucide-react'

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

import { ProductDetailsForm } from './product-details-form'

interface ProductDetailsDialogProps {
  product: Product
  orgSlug: string
}

export const ProductDetailsDialog = async ({
  product,
  orgSlug,
}: ProductDetailsDialogProps) => {
  const organizationCategories = await getOrganizationCategories(orgSlug)
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

        <div className="flex flex-col space-y-2">
          <p className="text-muted-foreground">{product.description}</p>

          <ProductDetailsForm
            product={product}
            organizationCategories={organizationCategories}
            orgSlug={orgSlug}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
