export interface CreatePersonDto {
  name: string;
  note?: string;
  userId: string;
}

export interface UpdatePersonDto {
  name?: string;
  note?: string;
}
