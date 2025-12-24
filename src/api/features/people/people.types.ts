export interface CreatePersonDto {
  name: string;
  note?: string;
  userId: number;
}

export interface UpdatePersonDto {
  name?: string;
  note?: string;
}
