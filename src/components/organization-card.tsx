import { faker } from '@faker-js/faker'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleBadge } from '@/components/ui/role-badge'
import { generateSlug } from '@/lib/utils'

interface OrganizationCardProps {
  organization: {
    id: string
    name: string
    domain: string | null
    imageUrl: string | null
    role: 'ADMIN' | 'BILLING' | 'MEMBER'
  }
}

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const slug = generateSlug(organization.name)
  return (
    <Card key={organization.id} className="bg-secondary/40">
      <Link
        href={`/organizations/${slug}`}
        className="group flex flex-row items-center justify-between pr-2"
      >
        <div className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex flex-row items-center gap-3">
              <Image
                src={organization.imageUrl ?? faker.image.avatarGitHub()}
                alt={organization.name}
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-0.5">
                <CardTitle className="text-xl">{organization.name}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {organization.domain}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <RoleBadge role={organization.role} />
          </CardContent>
        </div>

        <ChevronRight className="size-6 text-muted transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:text-primary" />
      </Link>
    </Card>
  )
}
