import { api } from '@/lib/axios'

interface GetInventoryMetricsRequest {
  slug: string
}

interface GetInventoryMetricsResponse {
  products: {
    code: string
    name: string
    stock: number
    id: string
  }[]
}

export async function getInventoryMetrics(data: GetInventoryMetricsRequest) {
  const { slug } = data

  const result = await api.get<GetInventoryMetricsResponse>(
    `/organizations/${slug}/product-stock`,
  )
  return result.data
}
