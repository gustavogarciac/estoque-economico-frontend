'use client'

import { faker } from '@faker-js/faker'
import { Check, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

interface Organization {
  id: string
  name: string
  imageUrl: string
}

export const JoinOrganizationComboBox = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrganization, setSelectedOrganization] = useState('')

  useEffect(() => {
    async function fetchOrganizations() {
      const response = await api.get<Organization[]>('/organizations')

      const organizations = response.data

      setOrganizations(organizations)
    }

    fetchOrganizations()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full">
            {selectedOrganization ? (
              <div className="flex flex-row items-center gap-1">
                <Image
                  alt="Organization"
                  width={20}
                  height={20}
                  className="rounded-full"
                  src={
                    organizations.find(
                      (organization) =>
                        organization.name === selectedOrganization,
                    )?.imageUrl ?? faker.image.avatarGitHub()
                  }
                />
                <span>
                  {
                    organizations.find(
                      (organization) =>
                        organization.name === selectedOrganization,
                    )?.name
                  }
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">
                Selecione uma organização
              </span>
            )}
            <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Command>
            <CommandInput placeholder="Pesquisar organização" />

            <CommandEmpty className="flex flex-col gap-3 px-2 py-3">
              <span className="text-sm text-muted-foreground">
                Nenhuma organização encontrada...
              </span>
              <Button
                asChild
                className="w-full justify-start px-2"
                variant="secondary"
              >
                <Link href="/onboarding/create-organization">
                  <PlusIcon className="mr-2 size-4" /> Criar organização
                </Link>
              </Button>
            </CommandEmpty>

            <CommandList>
              <CommandGroup>
                {organizations &&
                  organizations.map((organization) => (
                    <CommandItem
                      key={organization.id}
                      value={organization.name}
                      onSelect={(currentValue) => {
                        setSelectedOrganization(currentValue)
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Check
                          className={cn(
                            'mr-2 size-4',
                            organization.name === selectedOrganization
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <Image
                          alt={organization.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                          src={
                            organization.imageUrl ?? faker.image.avatarGitHub()
                          }
                        />
                        {organization.name}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button size="sm" className="mt-3">
        Enviar solicitação
      </Button>
    </div>
  )
}
