export type VehicleStatus = "pending" | "approved" | "rejected";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          user_id: string | null;
          brand: string | null;
          model: string | null;
          year: number | null;
          mileage: string | null;
          fuel_type: string | null;
          transmission: string | null;
          horsepower: string | null;
          exterior_color: string | null;
          phone: string | null;
          email: string | null;
          seller_name: string | null;
          images: string[];
          status: VehicleStatus;
          condition: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          brand?: string | null;
          model?: string | null;
          year?: number | null;
          mileage?: string | null;
          fuel_type?: string | null;
          transmission?: string | null;
          horsepower?: string | null;
          exterior_color?: string | null;
          phone?: string | null;
          email?: string | null;
          seller_name?: string | null;
          images?: string[];
          status?: VehicleStatus;
          condition?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type VehicleRow = Database["public"]["Tables"]["vehicles"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
