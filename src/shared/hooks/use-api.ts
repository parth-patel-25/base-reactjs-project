import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/shared/lib/api-client"

interface UseApiOptions<T> {
  key: string
  url: string
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useApi<T>({ key, url, enabled = true, onSuccess, onError }: UseApiOptions<T>) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await apiClient.get<T>(url)
      return response.data
    },
    enabled,
    select: (data) => {
      onSuccess?.(data)
      return data
    },
    meta: {
      onError,
    },
  })
}

export function useApiMutation<TData, TVariables = unknown>(
  url: string,
  method: "post" | "put" | "patch" | "delete" = "post"
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient[method]<TData>(url, variables)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [url] })
    },
  })
}