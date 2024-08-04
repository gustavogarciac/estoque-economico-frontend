'use client'

import { format, subDays } from 'date-fns'
import { FilterIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { DateFiltering } from './date-filtering'

type Props = {
  slug: string
  categories: Category[]
}

export const Filters = ({ slug, categories }: Props) => {
  const router = useRouter()

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: subDays(new Date(), 30),
  })

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | null
  >()

  function handleSubmitFilters() {
    if (!date) return

    const formattedFromDate = date.from
      ? format(date.from, "yyyy-MM-dddd'T'HH:mm:ss'Z'")
      : undefined
    const formattedToDate = date.to
      ? format(date.to, "yyyy-MM-dddd'T'HH:mm:ss'Z'")
      : undefined

    router.push(
      `/organizations/${slug}/metrics/inventory?from=${formattedFromDate}&to=${formattedToDate}&categoryId=${selectedCategory}`,
    )
  }

  function handleClearFilters() {
    setDate(undefined)
    router.push(`/organizations/${slug}/metrics/inventory`)
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <DateFiltering date={date} setDate={setDate} />

      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger className="max-w-32">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSubmitFilters}>
        <FilterIcon className="mr-2 size-4" />
        Filtrar
      </Button>
      <Button variant="secondary" onClick={handleClearFilters}>
        <XIcon className="mr-2 size-4" />
        Limpar filtros
      </Button>
    </div>
  )
}
