'use client'

import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

export const SearchInput = () => {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'code' | 'name'>('code')

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmitSearch()
    }

    if (event.key === 'Esc') {
      event.preventDefault()
      setSearch('')
    }
  }

  function handleSubmitSearch() {
    event?.preventDefault()
    if (!search) return
    console.log('Search for:', search)
    console.log('Filter type:', filterType)
  }

  return (
    <form className="flex w-full flex-row gap-2">
      <div className="relative flex w-full overflow-hidden rounded-sm bg-secondary/40">
        <Button size="icon" variant="ghost" onClick={handleSubmitSearch}>
          <SearchIcon className="size-4" />
        </Button>
        <Input
          placeholder={
            filterType === 'code'
              ? 'Pesquise pelo código do produto...'
              : 'Pesquise pelo nome do produto...'
          }
          type="search"
          className="w-full bg-transparent focus-visible:ring-0"
          onKeyDown={handleKeydown}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <Select
        value={filterType}
        onValueChange={(value: 'code' | 'name') => setFilterType(value)}
      >
        <SelectTrigger className="w-32">
          <span className="text-sm text-muted-foreground">Filtrar por:</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="code">Código</SelectItem>
          <SelectItem value="name">Nome</SelectItem>
        </SelectContent>
      </Select>
    </form>
  )
}
