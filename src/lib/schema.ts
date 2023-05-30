export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	public: {
		Tables: {
			posts: {
				Row: {
					article: string | null
					audio: string | null
					author_id: string
					created_at: string
					id: string
					image: string | null
					title: string
				}
				Insert: {
					article?: string | null
					audio?: string | null
					author_id: string
					created_at?: string
					id?: string
					image?: string | null
					title: string
				}
				Update: {
					article?: string | null
					audio?: string | null
					author_id?: string
					created_at?: string
					id?: string
					image?: string | null
					title?: string
				}
			}
			user_data: {
				Row: {
					display_name: string
					id: string
					role: Database['public']['Enums']['role']
				}
				Insert: {
					display_name: string
					id: string
					role?: Database['public']['Enums']['role']
				}
				Update: {
					display_name?: string
					id?: string
					role?: Database['public']['Enums']['role']
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			role: 'USER' | 'AUTHOR' | 'ADMIN'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
