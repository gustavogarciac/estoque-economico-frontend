import { api } from '@/lib/axios'

interface CreateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  description: string | null
  imageUrl: string | null
}

interface CreateOrganizationResponse {
  organizationId: string
}

export async function createOrganization(data: CreateOrganizationRequest) {
  const result = await api.post<CreateOrganizationResponse>('/organizations', {
    name: data.name,
    domain: data.domain,
    shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
    description: data.description,
    imageUrl: data.imageUrl,
  })

  return result.data
}
