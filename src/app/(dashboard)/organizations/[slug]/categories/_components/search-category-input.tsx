'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const SearchCategoryInput = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmitSearch()
    }

    if (event.key === 'Esc') {
      event.preventDefault()
      setSearch('')
      router.push(`/organizations/${slug}/categories`)
    }
  }

  function handleSubmitSearch() {
    event?.preventDefault()
    router.push(`/organizations/${slug}/categories?name=${search}`)
  }

  return (
    <form className="flex w-full flex-row gap-2">
      <div className="relative flex w-full overflow-hidden rounded-sm bg-secondary/40">
        <Button size="icon" variant="ghost" onClick={handleSubmitSearch}>
          <SearchIcon className="size-4" />
        </Button>
        <Input
          placeholder="Pesquise pelo nome da categoria..."
          type="search"
          className="w-full bg-transparent focus-visible:ring-0"
          onKeyDown={handleKeydown}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
    </form>
  )
}
