import { Container } from '@/components/container'
import { SearchInput } from '@/components/search-input'

export default function Home() {
  return (
    <Container otherClasses="mt-5">
      <div className="flex flex-row gap-4">
        <SearchInput />
      </div>
    </Container>
  )
}
