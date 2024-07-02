import { Container } from '@/components/container'
import { Skeleton } from '@/components/ui/skeleton'

const CategoryDetailsLoadingPage = () => {
  return (
    <Container otherClasses="space-y-6">
      <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-16 w-full" />
          </div>

          <Skeleton className="mt-1 h-10 w-1/2" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-[120px] w-[120px] rounded-full" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    </Container>
  )
}

export default CategoryDetailsLoadingPage
