import { Input } from "@/components/shad/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { Route } from "../_$mailFolder"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useCallback, useEffect } from "react";
import { Form, FormField, FormItem } from "@/components/shad/ui/form";

const formSchema = z.object({
  filter: z.string()
})

type FormSchema = z.infer<typeof formSchema>

export function Search() {
  const { filter } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filter
    }
  })

  const filterValue = form.watch("filter")

  const updateSearchFilter = debounce((value: string) => {
    navigate({
      params: (prev) => prev,
      search: (prev) => {
        return {
          ...prev,
          filter: value
        }
      },
      replace: true,
    })
  }, 1000)

  useEffect(() => {
    updateSearchFilter(filterValue)
  }, [updateSearchFilter, filterValue])


  return (
    <div className="p-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="filter"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8"
                  {...field}
                />
              </div>
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
