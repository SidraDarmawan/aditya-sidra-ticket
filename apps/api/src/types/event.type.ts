export interface EventQueryParams {
    take: number;
    page: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    search: string;
    userId?: number;  // Menambahkan userId dengan tipe number (optional)
  }
  
  // Tipe data untuk entitas Event
  export interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizerId: number;  // ID dari organizer
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Tipe data untuk membuat event baru
  export interface CreateEventDto {
    title: string;
    description: string;
    date: Date;
    location: string;
    organizerId: number;  // ID dari organizer
  }
  
  // Tipe data untuk memperbarui event yang ada
  export interface UpdateEventDto {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
  }