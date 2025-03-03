// Mock supabase client for development
export const supabase = {
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      }),
      single: async () => ({ data: null, error: null })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null })
        })
      })
    }),
    delete: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      })
    })
  })
}; 