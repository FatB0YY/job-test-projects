import { Button, Icon, Input } from '@/shared/ui'
import { FC, memo, useState } from 'react'

interface SearchInputProps {
  onSearchChange: (query: string) => void
  placeholder?: string
}

export const SearchInput: FC<SearchInputProps> = memo(
  ({ onSearchChange, placeholder }) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (query: string) => {
      if (query !== value) {
        setValue(query)
        onSearchChange(query)
      }
    }

    const clearSearch = () => {
      if (value !== '') {
        setValue('')
        onSearchChange('')
      }
    }

    return (
      <Input
        placeholder={placeholder}
        leftSection={<Icon size={22} name="Search" />}
        value={value}
        onChange={handleChange}
        rightSection={
          <Button size="100" variant="ghost" onClick={clearSearch}>
            <Icon size={22} name="XSmall" />
          </Button>
        }
      />
    )
  },
)
